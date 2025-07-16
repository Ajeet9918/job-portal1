import React, { createContext, useContext, useState } from 'react';

const initialJobs = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$120k - $180k',
    description: 'We are looking for a senior frontend developer to join our team and help build the next generation of web applications using React, TypeScript, and modern web technologies.',
    tags: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    postedAt: '2 days ago',
    logo: 'TC',
    featured: true
  },
  {
    id: '2',
    title: 'Product Manager',
    company: 'InnovateLabs',
    location: 'Remote',
    type: 'Full-time',
    salary: '$100k - $140k',
    description: 'Lead product strategy and development for our B2B SaaS platform. Work closely with engineering and design teams to deliver exceptional user experiences.',
    tags: ['Product Strategy', 'SaaS', 'Agile', 'Data Analysis'],
    postedAt: '1 day ago',
    logo: 'IL',
    featured: false
  },
  {
    id: '3',
    title: 'UX/UI Designer',
    company: 'DesignStudio',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$80k - $120k',
    description: 'Create beautiful and intuitive user experiences for our mobile and web applications. Collaborate with product and engineering teams to bring designs to life.',
    tags: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
    postedAt: '3 days ago',
    logo: 'DS',
    featured: true
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    company: 'CloudTech',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: '$110k - $160k',
    description: 'Build and maintain our cloud infrastructure, CI/CD pipelines, and monitoring systems. Help scale our platform to serve millions of users.',
    tags: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
    postedAt: '4 days ago',
    logo: 'CT',
    featured: false
  },
  {
    id: '5',
    title: 'Data Scientist',
    company: 'DataDriven',
    location: 'Seattle, WA',
    type: 'Full-time',
    salary: '$130k - $200k',
    description: 'Analyze large datasets to extract insights and build machine learning models that drive business decisions. Work with cutting-edge AI technologies.',
    tags: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'],
    postedAt: '5 days ago',
    logo: 'DD',
    featured: false
  },
  {
    id: '6',
    title: 'Backend Engineer',
    company: 'ScaleUp',
    location: 'Remote',
    type: 'Full-time',
    salary: '$100k - $150k',
    description: 'Build scalable backend systems and APIs that power our platform. Work with microservices architecture and modern database technologies.',
    tags: ['Node.js', 'GraphQL', 'PostgreSQL', 'Redis'],
    postedAt: '1 week ago',
    logo: 'SU',
    featured: true
  },
  {
    id: '7',
    title: 'Marketing Manager',
    company: 'GrowthCo',
    location: 'Los Angeles, CA',
    type: 'Full-time',
    salary: '$70k - $100k',
    description: 'Drive marketing campaigns and brand awareness for our fast-growing startup. Experience with digital marketing and analytics required.',
    tags: ['Digital Marketing', 'Analytics', 'SEO', 'Content Strategy'],
    postedAt: '3 days ago',
    logo: 'GC',
    featured: false
  },
  {
    id: '8',
    title: 'Mobile Developer',
    company: 'AppStudio',
    location: 'Remote',
    type: 'Contract',
    salary: '$80k - $120k',
    description: 'Develop cross-platform mobile applications using React Native. Work with a distributed team to deliver high-quality mobile experiences.',
    tags: ['React Native', 'iOS', 'Android', 'JavaScript'],
    postedAt: '1 day ago',
    logo: 'AS',
    featured: true
  }
];

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs] = useState(initialJobs);
  const [savedJobs, setSavedJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [filters, setFilters] = useState({
    jobType: '',
    salary: '',
    experience: '',
    remote: false
  });

  const saveJob = (jobId) => {
    setSavedJobs(prev => [...prev, jobId]);
  };

  const unsaveJob = (jobId) => {
    setSavedJobs(prev => prev.filter(id => id !== jobId));
  };

  const isJobSaved = (jobId) => {
    return savedJobs.includes(jobId);
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = searchQuery === '' || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesLocation = locationQuery === '' ||
      job.location.toLowerCase().includes(locationQuery.toLowerCase()) ||
      (locationQuery.toLowerCase().includes('remote') && job.location.toLowerCase().includes('remote'));

    const matchesJobType = filters.jobType === '' || job.type === filters.jobType;

    const matchesRemote = !filters.remote || job.location.toLowerCase().includes('remote');

    return matchesSearch && matchesLocation && matchesJobType && matchesRemote;
  });

  return (
    <JobContext.Provider value={{
      jobs,
      savedJobs,
      searchQuery,
      locationQuery,
      filters,
      setSearchQuery,
      setLocationQuery,
      setFilters,
      saveJob,
      unsaveJob,
      isJobSaved,
      filteredJobs
    }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJob = () => {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error('useJob must be used within a JobProvider');
  }
  return context;
};