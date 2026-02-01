import { useState, useEffect, ChangeEvent, FormEvent, useCallback } from 'react'
import Head from 'next/head'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { List, File, Shield, LogIn, LogOut, Upload, Trash2, PlusCircle, Loader2, Save } from 'lucide-react'

// Define the expected structure of a page
interface PageData {
  slug: string
  title: string
  content: string
  images: string[]
}

export default function AdminPage() {
  const [pages, setPages] = useState<{ [key: string]: PageData }>({})
  const [selectedSlug, setSelectedSlug] = useState<string>('')
  const [pageData, setPageData] = useState<PageData | null>(null)
  const [status, setStatus] = useState<{ message: string; type: 'info' | 'success' | 'error' } | null>(null)
  const [isAdmin, setIsAdmin] = useState<boolean | undefined>(undefined)
  const [file, setFile] = useState<File | null>(null)
  const [password, setPassword] = useState<string>('')
  const [loadingPages, setLoadingPages] = useState<boolean>(false)

  // Auth check on mount and periodically
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/auth-check')
        const authData = await response.json()
        setIsAdmin(authData.authenticated)
      } catch (error) {
        console.error('Auth check failed:', error)
        setIsAdmin(false)
      }
    }
    checkAuth()
    const interval = setInterval(checkAuth, 30000)
    return () => clearInterval(interval)
  }, [])

  // Function to fetch all pages data
  const fetchPagesData = useCallback(async () => {
    if (!isAdmin) return;
    setLoadingPages(true);
    try {
      const response = await fetch('/api/admin/pages');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPages(data);
      // If a page was selected, refresh its data
      if (selectedSlug && data[selectedSlug]) {
        setPageData(data[selectedSlug]);
      }
    } catch (error: any) {
      console.error('Failed to fetch pages data:', error);
      setStatus({ message: `Failed to load pages: ${error.message}`, type: 'error' });
    } finally {
      setLoadingPages(false);
    }
  }, [isAdmin, selectedSlug]);

  // Fetch pages data when admin status changes or on initial load
  useEffect(() => {
    if (isAdmin) {
      fetchPagesData();
    }
  }, [isAdmin, fetchPagesData]);

  // Update pageData when selectedSlug or pages change
  useEffect(() => {
    if (selectedSlug) {
      setPageData(pages[selectedSlug] || null);
    } else {
      setPageData(null);
    }
  }, [selectedSlug, pages]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    setStatus({ message: 'Logging in...', type: 'info' })
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (response.ok) {
        setStatus({ message: 'Successfully logged in!', type: 'success' })
        setIsAdmin(true)
        setPassword('')
        fetchPagesData(); // Fetch pages data after successful login
      } else {
        setStatus({ message: 'Login failed. Incorrect password.', type: 'error' })
      }
    } catch (error) {
      setStatus({ message: 'Login error.', type: 'error' })
    }
  }

  const handleFileUpload = async () => {
    if (!file || selectedSlug !== 'gallery' || !isAdmin) return
    setStatus({ message: 'Uploading...', type: 'info' })
    const formData = new FormData()
    formData.append('file', file)
    formData.append('slug', selectedSlug)

    try {
      const response = await fetch('/api/admin/upload', { method: 'POST', body: formData })
      const result = await response.json()
      if (response.ok && result.ok) {
        setStatus({ message: `Successfully uploaded: ${file.name}`, type: 'success' })
        setFile(null)
        fetchPagesData(); // Refresh pages data after successful upload
      } else {
        setStatus({ message: result.error || 'Upload failed.', type: 'error' })
      }
    } catch (error) {
      setStatus({ message: 'Upload error.', type: 'error' })
    }
  }

  const handleSavePageData = async () => {
    if (!pageData || !isAdmin) return;
    setStatus({ message: 'Saving page data...', type: 'info' });
    try {
      const response = await fetch(`/api/admin/pages/${selectedSlug}`, {
        method: 'POST', // or PUT, depending on API design
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pageData),
      });
      if (response.ok) {
        setStatus({ message: 'Page data saved successfully!', type: 'success' });
        fetchPagesData(); // Refresh pages data after saving
      } else {
        const errorData = await response.json();
        setStatus({ message: errorData.error || 'Failed to save page data.', type: 'error' });
      }
    } catch (error) {
      setStatus({ message: 'Error saving page data.', type: 'error' });
    }
  };

  const updatePageField = (field: keyof PageData, value: any) => {
    if (!pageData) return
    setPageData(prev => prev ? { ...prev, [field]: value } : null)
  }

  const updateImage = (index: number, value: string) => {
    if (!pageData) return
    const newImages = [...pageData.images]
    newImages[index] = value
    updatePageField('images', newImages)
  }

  const addImage = () => {
    if (!pageData) return
    const newImages = [...pageData.images, `/uploads/new-image-${Date.now()}.jpg`] // Placeholder for new image
    updatePageField('images', newImages)
  }

  const removeImage = (index: number) => {
    if (!pageData) return
    const newImages = pageData.images.filter((_, i) => i !== index)
    updatePageField('images', newImages)
  }

  if (isAdmin === undefined) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="h-16 w-16 animate-spin" />
      </div>
    )
  }

  return (
    <>
      <Head><title>Admin — lil group</title></Head>
      <div className="space-y-8">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Admin Panel</h1>

        {status && (
          <Alert variant={status.type === 'error' ? 'destructive' : 'default'}>
            <AlertTitle>
              {status.type === 'success' && 'Success!'}
              {status.type === 'error' && 'Error'}
              {status.type === 'info' && 'Status'}
            </AlertTitle>
            <AlertDescription>{status.message}</AlertDescription>
          </Alert>
        )}

        {!isAdmin ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><Shield className="mr-2" /> Admin Login</CardTitle>
              <CardDescription>You need to be logged in to manage page content.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter admin password" />
                </div>
                <Button type="submit" disabled={!password}><LogIn className="mr-2 h-4 w-4" /> Login</Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center"><List className="mr-2" /> Page Selection</CardTitle>
                  <CardDescription>Select a page to edit its content and images.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Select onValueChange={setSelectedSlug} value={selectedSlug} disabled={!isAdmin || loadingPages}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a page..." />
                    </SelectTrigger>
                    <SelectContent>
                      {loadingPages ? (
                        <SelectItem value="loading" disabled>Loading...</SelectItem>
                      ) : (
                        Object.keys(pages).map(slug => (
                          <SelectItem key={slug} value={slug}>{pages[slug]?.title || slug}</SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </CardContent>
                <CardFooter className="flex-col items-start gap-4">
                   <Button onClick={() => setIsAdmin(false)} variant="destructive" className="w-full">
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </Button>
                </CardFooter>
              </Card>

              {selectedSlug === 'gallery' && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center"><Upload className="mr-2" /> Upload Image</CardTitle>
                    <CardDescription>Upload a new image directly to the gallery.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="file-upload">Image File</Label>
                      <Input id="file-upload" type="file" accept="image/*" onChange={(e: ChangeEvent<HTMLInputElement>) => setFile(e.target.files?.[0] || null)} />
                    </div>
                    {file && <p className="text-sm text-muted-foreground">Selected: {file.name}</p>}
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleFileUpload} disabled={!file || !isAdmin} className="w-full">
                      <File className="mr-2 h-4 w-4" /> Upload to Gallery
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </div>

            {pageData && (
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Editing: {pageData.title}</CardTitle>
                  <CardDescription>Changes made here are reflected live on the site.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" type="text" value={pageData.title} onChange={(e) => updatePageField('title', e.target.value)} disabled={!isAdmin} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content">Content (HTML)</Label>
                    <Textarea id="content" value={pageData.content} onChange={(e) => updatePageField('content', e.target.value)} rows={12} disabled={!isAdmin} className="font-mono" />
                  </div>
                  <div className="space-y-4">
                    <Label>Images</Label>
                    {pageData.images.map((image, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input type="text" value={image} onChange={(e) => updateImage(index, e.target.value)} disabled={!isAdmin} />
                        <Button variant="destructive" size="icon" onClick={() => removeImage(index)} disabled={!isAdmin}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    ))}
                     <Button onClick={addImage} disabled={!isAdmin} variant="outline">
                      <PlusCircle className="mr-2 h-4 w-4" /> Add Image URL
                    </Button>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSavePageData} disabled={!isAdmin || loadingPages} className="w-full">
                    <Save className="mr-2 h-4 w-4" /> Save Page Data
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        )}
      </div>
    </>
  )
}