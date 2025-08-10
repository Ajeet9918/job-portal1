require('dotenv').config();
const mongoose = require('mongoose');
const Job = require('./models/Job');

const sampleJobs = [
  {
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$120k - $180k',
    description: 'We are looking for a senior frontend developer to join our team and help build the next generation of web applications using React, TypeScript, and modern web technologies.',
    requirements: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    tags: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    experience: 'Senior Level',
    featured: true
  },
  {
    title: 'Product Manager',
    company: 'InnovateLabs',
    location: 'Remote',
    type: 'Full-time',
    salary: '$100k - $140k',
    description: 'Lead product strategy and development for our B2B SaaS platform. Work closely with engineering and design teams to deliver exceptional user experiences.',
    requirements: ['Product Strategy', 'SaaS', 'Agile', 'Data Analysis'],
    tags: ['Product Strategy', 'SaaS', 'Agile', 'Data Analysis'],
    experience: 'Mid Level',
    featured: false
  },
  {
    title: 'UX/UI Designer',
    company: 'DesignStudio',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$80k - $120k',
    description: 'Create beautiful and intuitive user experiences for our mobile and web applications. Collaborate with product and engineering teams to bring designs to life.',
    requirements: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
    tags: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
    experience: 'Mid Level',
    featured: true
  },
  {
    title: 'DevOps Engineer',
    company: 'CloudTech',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: '$110k - $160k',
    description: 'Build and maintain our cloud infrastructure, CI/CD pipelines, and monitoring systems. Help scale our platform to serve millions of users.',
    requirements: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
    tags: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
    experience: 'Senior Level',
    featured: false
  },
  {
    title: 'Data Scientist',
    company: 'DataDriven',
    location: 'Seattle, WA',
    type: 'Full-time',
    salary: '$130k - $200k',
    description: 'Analyze large datasets to extract insights and build machine learning models that drive business decisions. Work with cutting-edge AI technologies.',
    requirements: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'],
    tags: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'],
    experience: 'Senior Level',
    featured: false
  },
  {
    title: 'Backend Engineer',
    company: 'ScaleUp',
    location: 'Remote',
    type: 'Full-time',
    salary: '$100k - $150k',
    description: 'Build scalable backend systems and APIs that power our platform. Work with microservices architecture and modern database technologies.',
    requirements: ['Node.js', 'GraphQL', 'PostgreSQL', 'Redis'],
    tags: ['Node.js', 'GraphQL', 'PostgreSQL', 'Redis'],
    experience: 'Mid Level',
    featured: true
  },
  {
    title: 'Marketing Manager',
    company: 'GrowthCo',
    location: 'Los Angeles, CA',
    type: 'Full-time',
    salary: '$70k - $100k',
    description: 'Drive marketing campaigns and brand awareness for our fast-growing startup. Experience with digital marketing and analytics required.',
    requirements: ['Digital Marketing', 'Analytics', 'SEO', 'Content Strategy'],
    tags: ['Digital Marketing', 'Analytics', 'SEO', 'Content Strategy'],
    experience: 'Mid Level',
    featured: false
  },
  {
    title: 'Mobile Developer',
    company: 'AppStudio',
    location: 'Remote',
    type: 'Contract',
    salary: '$80k - $120k',
    description: 'Develop cross-platform mobile applications using React Native. Work with a distributed team to deliver high-quality mobile experiences.',
    requirements: ['React Native', 'iOS', 'Android', 'JavaScript'],
    tags: ['React Native', 'iOS', 'Android', 'JavaScript'],
    experience: 'Mid Level',
    featured: true
  },
  {
    title: 'Frontend Developer',
    company: 'WebSolutions',
    location: 'Chicago, IL',
    type: 'Part-time',
    salary: '$60k - $90k',
    description: 'Join our team to build modern web applications using React and Vue.js. Perfect opportunity for developers looking to grow their skills.',
    requirements: ['React', 'Vue.js', 'JavaScript', 'CSS'],
    tags: ['React', 'Vue.js', 'JavaScript', 'CSS'],
    experience: 'Entry Level',
    featured: false
  },
  {
    title: 'Full Stack Developer',
    company: 'StartupHub',
    location: 'Remote',
    type: 'Freelance',
    salary: '$90k - $130k',
    description: 'Work on exciting projects for various startups. Full stack development with modern technologies and flexible working hours.',
    requirements: ['JavaScript', 'Python', 'React', 'Django'],
    tags: ['JavaScript', 'Python', 'React', 'Django'],
    experience: 'Mid Level',
    featured: false
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing jobs
    await Job.deleteMany({});
    console.log('Cleared existing jobs');

    // Insert sample jobs
    const insertedJobs = await Job.insertMany(sampleJobs);
    console.log(`Inserted ${insertedJobs.length} jobs`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
