// Shared data store for admin and live site synchronization
export interface PageData {
  slug: string
  title: string
  content: string
  images: string[]
}

// Initial static data
export const initialPages: { [key: string]: PageData } = {
  'home': {
    slug: 'home',
    title: 'Welcome to lil group',
    content: '<p>Welcome to <strong>lil group</strong> — where learning meets curiosity and mind is treated like a garden.</p><p>This site emphasizes books, cognition, and the sciences of learning: reading lists, research highlights, and practical exercises are available across the site. Below you\'ll find quick links to reading lists and featured topics like memory techniques, cognitive science primers, and recommended textbooks.</p><h3>Featured Reading</h3><ul><li><em>Thinking, Fast and Slow</em> — Daniel Kahneman</li><li><em>Why We Sleep</em> — Matthew Walker</li><li><em>Make It Stick</em> — Brown, Roediger, and McDaniel</li></ul><h3>Latest Learning Insights</h3><p>Research shows that active recall and spaced repetition are the most effective study strategies. Our curated reading lists and workshops help you implement these evidence-based techniques in your daily learning routine.</p><p>Join our community of lifelong learners and discover how brain science can transform your approach to education.</p>',
    images: [
      "https://picsum.photos/seed/books1/1200/600",
      "https://picsum.photos/seed/brain1/1200/600",
      "https://picsum.photos/seed/library1/1200/600",
      "https://picsum.photos/seed/learning1/800/400",
      "https://picsum.photos/seed/study1/800/400"
    ]
  },
  'academics': {
    slug: 'academics',
    title: 'Academics & Research',
    content: '<p><strong>Academic Excellence</strong> at lil group combines rigorous research with practical learning applications. Our academic programs focus on cognitive science, educational psychology, and evidence-based teaching methodologies.</p><h3>Research Focus Areas</h3><ul><li><strong>Cognitive Psychology:</strong> Memory formation, information processing, and learning optimization</li><li><strong>Educational Neuroscience:</strong> Brain-based learning strategies and neuroplasticity research</li><li><strong>Literacy Development:</strong> Reading comprehension and language acquisition studies</li><li><strong>Learning Analytics:</strong> Data-driven approaches to educational improvement</li></ul><h3>Academic Programs</h3><p>We offer comprehensive programs designed to bridge the gap between theoretical knowledge and practical application. Our curriculum integrates cutting-edge research with hands-on learning experiences.</p><h3>Research Partnerships</h3><p>Collaborating with leading universities and research institutions to advance the science of learning and education.</p><h3>Publications & Findings</h3><p>Our research team regularly publishes findings in peer-reviewed journals and presents at international conferences on learning sciences.</p>',
    images: [
      "https://picsum.photos/seed/academics-research/1200/800",
      "https://picsum.photos/seed/academic-library/1200/800",
      "https://picsum.photos/seed/research-lab/800/600",
      "https://picsum.photos/seed/study-group/800/600",
      "https://picsum.photos/seed/academic-presentation/800/600"
    ]
  },
  'about': {
    slug: 'about',
    title: 'About lil group',
    content: '<p><strong>lil group</strong> is dedicated to research-based learning and the joy of reading. Our work focuses on cognition, literacy, and accessible education for learners of all ages.</p><p>We curate reading lists, publish short primers on brain science, and host public workshops to help learners improve memory, comprehension, and critical thinking skills.</p><h3>Our Mission</h3><p>To bridge the gap between cognitive science research and practical learning strategies, making evidence-based education accessible to everyone.</p><h3>What We Do</h3><ul><li>Curate evidence-based reading lists</li><li>Host workshops on learning techniques</li><li>Publish accessible brain science primers</li><li>Create community learning spaces</li></ul><h3>Our Approach</h3><p>We combine cutting-edge neuroscience research with practical, actionable strategies that you can implement immediately in your learning journey.</p>',
    images: [
      "https://picsum.photos/seed/aboutbooks1/1200/800",
      "https://picsum.photos/seed/aboutbrain1/1200/800",
      "https://picsum.photos/seed/workshop1/800/600",
      "https://picsum.photos/seed/community1/800/600"
    ]
  },
  'admissions': {
    slug: 'admissions',
    title: 'Admissions & Enrollment',
    content: '<p><strong>Join Our Learning Community</strong> at lil group and embark on a transformative educational journey. Our admissions process is designed to identify passionate learners who will thrive in our evidence-based learning environment.</p><h3>Admission Requirements</h3><ul><li><strong>Academic Background:</strong> Previous coursework in psychology, education, or related fields</li><li><strong>Statement of Purpose:</strong> Personal essay explaining your learning goals</li><li><strong>Letters of Recommendation:</strong> From teachers, mentors, or employers</li><li><strong>Interview:</strong> Virtual meeting with our admissions team</li></ul><h3>Program Options</h3><p>Choose from various programs including cognitive science, educational psychology, and learning research. Each program is designed to provide both theoretical knowledge and practical application.</p><h3>Application Timeline</h3><p>Rolling admissions with multiple start dates throughout the year. Early applications are encouraged for optimal placement and scholarship consideration.</p><h3>Scholarship Opportunities</h3><p>Merit-based and need-based scholarships available for qualified candidates. Our financial aid team works with each student to create affordable education pathways.</p>',
    images: [
      "https://picsum.photos/seed/admissions-office/1200/800",
      "https://picsum.photos/seed/student-interview/1200/800",
      "https://picsum.photos/seed/campus-tour/800/600",
      "https://picsum.photos/seed/enrollment-center/800/600",
      "https://picsum.photos/seed/admissions-ceremony/800/600"
    ]
  },
  'gallery': {
    slug: 'gallery',
    title: 'Gallery — lil group',
    content: '<p>Browse visual collections from readings, projects, and exhibitions that emphasize books, brains, and learning. Our gallery showcases student work, event highlights, and visual representations of learning concepts.</p><h3>Current Exhibitions</h3><p><strong>Mind Maps & Visual Learning:</strong> Student-created visual representations of complex concepts.</p><p><strong>Reading Journey Photos:</strong> Documentation of our community reading events and book clubs.</p><p><strong>Science of Learning Infographics:</strong> Visual explanations of cognitive science principles.</p><h3>Submit Your Work</h3><p>Community members can submit their own visual learning projects, mind maps, and educational artwork for inclusion in our gallery.</p><p>Uploads via admin are shown here - share your visual learning journey with our community!</p>',
    images: [
      "https://picsum.photos/seed/gallery1/1200/800",
      "https://picsum.photos/seed/gallery2/1200/800",
      "https://picsum.photos/seed/gallery3/800/600",
      "https://picsum.photos/seed/gallery4/800/600",
      "https://picsum.photos/seed/gallery5/800/600"
    ]
  },
  'resources': {
    slug: 'resources',
    title: 'Resources — lil group',
    content: '<p>A rich resource hub focused on books about learning, curated reading lists, summaries, and practical exercises for memory and comprehension enhancement.</p><h3>Top Categories</h3><ul><li><strong>Reading Lists:</strong> Curated by topic (memory, learning, literacy)</li><li><strong>Brain Science:</strong> Primers and accessible summaries</li><li><strong>Study Tools:</strong> Summaries, spaced-repetition guides, note-taking templates</li></ul><h3>Sample Books</h3><ol><li><em>Make It Stick</em> — Practical strategies for effective learning</li><li><em>How We Learn</em> — The science of learning</li><li><em>The Organized Mind</em> — Tools for managing information</li><li><em>Deep Work</em> — Focused productivity in a distracted world</li><li><em>Atomic Habits</em> — Building better learning habits</li></ol><h3>Downloadable Resources</h3><p>PDF guides, note-taking templates, and study planners available for all community members.</p><h3>Video Library</h3><p>Recorded lectures, workshop sessions, and tutorials on evidence-based learning techniques.</p>',
    images: [
      "https://picsum.photos/seed/resources-books1/1200/800",
      "https://picsum.photos/seed/resources-brain1/1200/800",
      "https://picsum.photos/seed/resources-library1/1200/800",
      "https://picsum.photos/seed/resources-books2/1200/800",
      "https://picsum.photos/seed/resources1/800/600",
      "https://picsum.photos/seed/resources2/800/600"
    ]
  },
  'events': {
    slug: 'events',
    title: 'Events & Workshops',
    content: '<p>Check our calendar for reading groups, lectures on neuroscience, and workshops on study techniques. Join our community of learners and experts.</p><h3>Upcoming Events</h3><p><strong>Memory Olympics Workshop:</strong> Practice and learn advanced memory techniques.</p><p><strong>Book Club: Cognitive Science Classics:</strong> Monthly discussions of foundational texts.</p><p><strong>Study Skills Bootcamp:</strong> Intensive workshop on evidence-based learning strategies.</p><h3>Past Events</h3><p>Public lectures on \'The Science of Reading,\' hands-on \'Memory Olympics\' workshops, and author talks with leading cognitive scientists.</p><h3>Special Programs</h3><p>Summer reading programs, winter study intensives, and guest lectures from prominent researchers in the field of learning science.</p><h3>All events are designed to be interactive, practical, and based on the latest research in cognitive psychology and neuroscience.</p>',
    images: [
      "https://picsum.photos/seed/events-brain/1200/800",
      "https://picsum.photos/seed/events-books/1200/800",
      "https://picsum.photos/seed/workshop2/800/600",
      "https://picsum.photos/seed/lecture1/800/600",
      "https://picsum.photos/seed/bookclub1/800/600"
    ]
  },
  'contact': {
    slug: 'contact',
    title: 'Contact & Visit',
    content: '<p>Reach out for partnerships on literacy initiatives, book drives, or community brain awareness projects. We\'d love to hear from researchers, librarians, and community educators.</p><h3>Get in Touch</h3><p><strong>Email:</strong> hello@lilgroup.org</p><p><strong>Phone:</strong> (555) 123-4567</p><p><strong>Location:</strong> Learning Center, 123 Knowledge Street</p><h3>Partnership Opportunities</h3><p>We collaborate with schools, libraries, and community organizations to promote evidence-based learning and literacy initiatives.</p><h3>Visit Us</h3><p>Our learning center is open Monday through Friday, 9 AM to 6 PM. Drop by to browse our reading room, attend a workshop, or just chat about learning science.</p><p>Follow us on social media for daily learning tips and event updates.</p>',
    images: [
      "https://picsum.photos/seed/contact-books/1200/800",
      "https://picsum.photos/seed/office1/800/600",
      "https://picsum.photos/seed/meeting1/800/600",
      "https://picsum.photos/seed/reception1/800/600"
    ]
  }
}

// Live shared data store (starts as copy of initial)
let livePagesData = { ...initialPages }

// Global update function
export function updateLivePagesData(slug: string, data: Partial<PageData>) {
  if (livePagesData[slug]) {
    livePagesData[slug] = { ...livePagesData[slug], ...data }
  }
}

// Getter for current data
export function getLivePagesData() {
  return livePagesData
}

// Reset to initial data
export function resetLivePagesData() {
  livePagesData = { ...initialPages }
}