const mongoose = require("mongoose");
const Job = require("./models/jobModel"); // Adjust the path to your Job model if necessary

// Helper function to generate a random number of applicants
const getRandomApplicants = () => {
  return Math.floor(Math.random() * 900) + 1001; // Generates a number between 1001 and 1900
};
const jobs = [
  {
    title: "Senior Flutter Developer",
    org: "Tech Solutions Inc.",
    description: "Tech Solutions Inc. is seeking a Senior Flutter Developer to lead our mobile development team. The ideal candidate should have extensive experience with Flutter and Dart, and be capable of designing, building, and maintaining efficient, reusable, and reliable code. You will collaborate with cross-functional teams to define, design, and ship new features, ensuring the best possible performance, quality, and responsiveness of the applications. This is a full-time position located in San Francisco, CA, with a competitive salary package and growth opportunities.",
    imageUrl: "https://example.com/flutter-developer.jpg",
    minSalary: 80000,
    maxSalary: 120000,
    type: "Full Time",
    skill: ["Flutter", "Dart", "Git", "Firebase"],
    location: "San Francisco, CA",
    applicants: [],
    applyCount: getRandomApplicants()
  },
  {
    title: "Backend Engineer",
    org: "Innovative Softwares",
    description: "Innovative Softwares is looking for a Backend Engineer responsible for building and maintaining the server-side logic of our applications. The candidate should have strong experience with Node.js, Python, and database management. You will work closely with the front-end team to integrate user-facing elements with server-side logic. Familiarity with Docker and cloud platforms like AWS or Azure is essential. This is a remote role offering flexibility and a competitive salary, along with opportunities for personal and professional development.",
    imageUrl: "https://example.com/backend-engineer.jpg",
    minSalary: 90000,
    maxSalary: 140000,
    type: "Remote",
    skill: ["Node.js", "Python", "Docker", "MongoDB"],
    location: "Remote",
    applicants: [],
    applyCount: getRandomApplicants()
  },
  {
    title: "Data Scientist",
    org: "DataWorks",
    description: "DataWorks is hiring a Data Scientist to analyze and interpret complex datasets to help our clients make data-driven decisions. The ideal candidate will have experience in Python, machine learning, and data analysis tools like Pandas and TensorFlow. Your role will involve building predictive models, performing statistical analyses, and communicating insights to stakeholders. This full-time position is based in New York, NY, and offers a competitive salary, along with benefits and opportunities for career advancement in a rapidly growing company.",
    imageUrl: "https://example.com/data-scientist.jpg",
    minSalary: 95000,
    maxSalary: 150000,
    type: "Full Time",
    skill: ["Python", "Machine Learning", "Pandas", "TensorFlow"],
    location: "New York, NY",
    applicants: [],
    applyCount: getRandomApplicants()
  },
  {
    title: "Frontend Developer",
    org: "Web Creatives",
    description: "Web Creatives is looking for a Frontend Developer to design and develop user-facing features for our websites. The candidate should have experience with JavaScript frameworks like React, and strong skills in HTML/CSS. You will be responsible for ensuring the technical feasibility of UI/UX designs, optimizing applications for maximum speed, and collaborating with other team members and stakeholders. This part-time position in Austin, TX, offers flexibility and the opportunity to work on exciting projects with a creative team.",
    imageUrl: "https://example.com/frontend-developer.jpg",
    minSalary: 70000,
    maxSalary: 100000,
    type: "Part Time",
    skill: ["JavaScript", "React", "HTML/CSS", "Tailwind CSS"],
    location: "Austin, TX",
    applicants: [],
    applyCount: getRandomApplicants()
  },
  {
    title: "DevOps Engineer",
    org: "CloudMasters",
    description: "CloudMasters is seeking a DevOps Engineer to join our team and implement CI/CD pipelines, automate infrastructure, and manage cloud environments. The ideal candidate will have extensive experience with AWS, Docker, Kubernetes, and Terraform. You will work closely with software developers, system operators, and other IT staff to oversee code releases. This full-time role is based in Seattle, WA, and offers a competitive salary with benefits, providing opportunities to work on cutting-edge technology in a fast-paced environment.",
    imageUrl: "https://example.com/devops-engineer.jpg",
    minSalary: 110000,
    maxSalary: 160000,
    type: "Full Time",
    skill: ["AWS", "Docker", "Kubernetes", "Terraform"],
    location: "Seattle, WA",
    applicants: [],
    applyCount: getRandomApplicants()
  },
  {
    title: "UI/UX Designer",
    org: "Creative Studio",
    description: "Creative Studio is looking for a UI/UX Designer to create intuitive and aesthetically pleasing user interfaces. The candidate should have a strong portfolio showcasing their design work, and proficiency in tools like Figma and Adobe XD. You will collaborate with product managers and engineers to gather user requirements, design wireframes, and create user flows. This contract position is based in Los Angeles, CA, offering a dynamic work environment and the opportunity to contribute to exciting projects.",
    imageUrl: "https://example.com/ui-ux-designer.jpg",
    minSalary: 60000,
    maxSalary: 90000,
    type: "Contract",
    skill: ["Figma", "Adobe XD", "UI/UX Design", "Material UI"],
    location: "Los Angeles, CA",
    applicants: [],
    applyCount: getRandomApplicants()
  },
  {
    title: "Project Manager",
    org: "Agile Systems",
    description: "Agile Systems is hiring a Project Manager to oversee projects from inception to completion, ensuring they meet deadlines, budget requirements, and client expectations. The ideal candidate will have experience in Agile methodologies, Scrum, and tools like JIRA. You will coordinate with cross-functional teams, manage project risks, and provide clear communication to stakeholders. This remote position offers flexibility, a competitive salary, and the opportunity to lead diverse and challenging projects.",
    imageUrl: "https://example.com/project-manager.jpg",
    minSalary: 90000,
    maxSalary: 130000,
    type: "Remote",
    skill: ["Agile", "Scrum", "JIRA", "DevOps"],
    location: "Remote",
    applicants: [],
    applyCount: getRandomApplicants()
  },
  {
    title: "iOS Developer",
    org: "MobileFirst",
    description: "MobileFirst is looking for an iOS Developer to develop cutting-edge iOS applications. The ideal candidate will have a strong background in Swift, experience with iOS frameworks, and a passion for creating high-quality mobile applications. You will work closely with the design team to create visually appealing and functional apps, ensuring optimal performance and user experience. This full-time position in San Jose, CA, offers a competitive salary and the chance to work with a dynamic team on innovative projects.",
    imageUrl: "https://example.com/ios-developer.jpg",
    minSalary: 85000,
    maxSalary: 125000,
    type: "Full Time",
    skill: ["Swift", "iOS", "Git", "Firebase"],
    location: "San Jose, CA",
    applicants: [],
    applyCount: getRandomApplicants()
  },
  {
    title: "Cybersecurity Analyst",
    org: "SecureTech",
    description: "SecureTech is seeking a Cybersecurity Analyst to protect organizations from cyber threats. The candidate should have experience in Python, Linux, and networking, with a strong understanding of security best practices. You will be responsible for identifying vulnerabilities, responding to incidents, and implementing security measures to safeguard sensitive data. This full-time role in Washington, DC, offers a competitive salary, benefits, and the opportunity to work on critical security projects in a fast-paced environment.",
    imageUrl: "https://example.com/cybersecurity-analyst.jpg",
    minSalary: 100000,
    maxSalary: 145000,
    type: "Full Time",
    skill: ["Python", "Cybersecurity", "Linux", "Networking"],
    location: "Washington, DC",
    applicants: [],
    applyCount: getRandomApplicants()
  },
  {
    title: "Machine Learning Engineer",
    org: "AI Innovators",
    description: "AI Innovators is looking for a Machine Learning Engineer to build and deploy machine learning models. The ideal candidate should have experience with Python, TensorFlow, and data analysis. You will work on developing algorithms, performing data preprocessing, and deploying models into production. This remote position offers a competitive salary, the flexibility to work from anywhere, and the opportunity to work on cutting-edge technology in the AI space.",
    imageUrl: "https://example.com/ml-engineer.jpg",
    minSalary: 110000,
    maxSalary: 160000,
    type: "Remote",
    skill: ["Python", "TensorFlow", "Pandas", "Data Analysis"],
    location: "Remote",
    applicants: [],
    applyCount: getRandomApplicants()
  },
  {
    title: "Full Stack Developer",
    org: "TechGiant",
    description: "TechGiant is seeking a Full Stack Developer to work on both frontend and backend development for large-scale applications. The ideal candidate will have experience with JavaScript, Node.js, React, and MongoDB. You will be responsible for designing and implementing web applications, collaborating with cross-functional teams, and ensuring the scalability and performance of the applications. This full-time position in Boston, MA, offers a competitive salary and the opportunity to work on innovative projects in a dynamic environment.",
    imageUrl: "https://example.com/full-stack-developer.jpg",
    minSalary: 95000,
    maxSalary: 135000,
    type: "Full Time",
    skill: ["JavaScript", "Node.js", "React", "MongoDB"],
    location: "Boston, MA",
    applicants: [],
    applyCount: getRandomApplicants()
  },
  {
    title: "Cloud Architect",
    org: "SkyTech",
    description: "SkyTech is looking for a Cloud Architect to design and manage our cloud infrastructure. The ideal candidate will have extensive experience with AWS, Azure, or Google Cloud, and a strong understanding of cloud security, scalability, and cost optimization. You will work closely with development teams to architect and implement cloud solutions that meet business needs. This full-time position is based in Denver, CO, offering a competitive salary, benefits, and the opportunity to work on innovative cloud projects.",
    imageUrl: "https://example.com/cloud-architect.jpg",
    minSalary: 120000,
    maxSalary: 170000,
    type: "Full Time",
    skill: ["AWS", "Azure", "Google Cloud", "Cloud Security"],
    location: "Denver, CO",
    applicants: [],
    applyCount: getRandomApplicants()
  },
  {
    title: "Quality Assurance Engineer",
    org: "TechTesters",
    description: "TechTesters is hiring a Quality Assurance Engineer to ensure the quality of our software products through rigorous testing and analysis. The ideal candidate will have experience with automated testing tools, test plan creation, and defect tracking. You will work closely with developers to identify and resolve issues, ensuring that our products meet the highest standards. This full-time role in Chicago, IL, offers a competitive salary, benefits, and the chance to work in a collaborative and fast-paced environment.",
    imageUrl: "https://example.com/qa-engineer.jpg",
    minSalary: 80000,
    maxSalary: 115000,
    type: "Full Time",
    skill: ["Automated Testing", "Selenium", "JIRA", "Agile"],
    location: "Chicago, IL",
    applicants: [],
    applyCount: getRandomApplicants()
  },
  {
    title: "Blockchain Developer",
    org: "CryptoCore",
    description: "CryptoCore is seeking a Blockchain Developer to work on developing and implementing blockchain-based applications. The ideal candidate should have experience with Solidity, Ethereum, and smart contracts. You will be responsible for designing, developing, and deploying decentralized applications (dApps), as well as ensuring their security and efficiency. This full-time remote position offers flexibility, a competitive salary, and the opportunity to work on cutting-edge blockchain technology.",
    imageUrl: "https://example.com/blockchain-developer.jpg",
    minSalary: 110000,
    maxSalary: 150000,
    type: "Remote",
    skill: ["Solidity", "Ethereum", "Blockchain", "Smart Contracts"],
    location: "Remote",
    applicants: [],
    applyCount: getRandomApplicants()
  },
  {
    title: "Digital Marketing Specialist",
    org: "BrandBoost",
    description: "BrandBoost is looking for a Digital Marketing Specialist to develop and execute online marketing strategies. The ideal candidate will have experience with SEO, PPC, content marketing, and social media management. You will be responsible for increasing brand awareness, driving traffic to our website, and optimizing conversion rates. This full-time role in Miami, FL, offers a competitive salary, benefits, and the opportunity to work on exciting marketing campaigns for various clients.",
    imageUrl: "https://example.com/digital-marketing-specialist.jpg",
    minSalary: 70000,
    maxSalary: 100000,
    type: "Full Time",
    skill: ["SEO", "PPC", "Content Marketing", "Google Analytics"],
    location: "Miami, FL",
    applicants: [],
    applyCount: getRandomApplicants()
  },
  {
    title: "Business Analyst",
    org: "ConsultCorp",
    description: "ConsultCorp is hiring a Business Analyst to work with clients in analyzing business needs, identifying solutions, and driving project success. The ideal candidate will have experience with requirements gathering, process modeling, and data analysis. You will work closely with stakeholders to ensure project objectives are met and deliver value to the business. This full-time role in Atlanta, GA, offers a competitive salary, benefits, and the opportunity to work on high-impact projects.",
    imageUrl: "https://example.com/business-analyst.jpg",
    minSalary: 85000,
    maxSalary: 120000,
    type: "Full Time",
    skill: ["Business Analysis", "Process Modeling", "Data Analysis", "SQL"],
    location: "Atlanta, GA",
    applicants: [],
    applyCount: getRandomApplicants()
  },
  {
    title: "Product Manager",
    org: "InnovateX",
    description: "InnovateX is seeking a Product Manager to oversee the development and launch of new products. The ideal candidate should have experience in product lifecycle management, market research, and Agile methodologies. You will work closely with cross-functional teams to define product requirements, prioritize features, and ensure successful product launches. This full-time position is based in San Francisco, CA, offering a competitive salary, stock options, and the opportunity to lead innovative projects.",
    imageUrl: "https://example.com/product-manager.jpg",
    minSalary: 120000,
    maxSalary: 170000,
    type: "Full Time",
    skill: ["Product Management", "Agile", "Market Research", "Scrum"],
    location: "San Francisco, CA",
    applicants: [],
    applyCount: getRandomApplicants()
  },
  {
    title: "Salesforce Administrator",
    org: "CRM Masters",
    description: "CRM Masters is looking for a Salesforce Administrator to manage and optimize our Salesforce platform. The ideal candidate should have experience with Salesforce administration, customization, and integration with other systems. You will be responsible for user management, data integrity, and implementing new features to improve business processes. This full-time position in New York, NY, offers a competitive salary, benefits, and the chance to work in a dynamic and fast-paced environment.",
    imageUrl: "https://example.com/salesforce-administrator.jpg",
    minSalary: 85000,
    maxSalary: 120000,
    type: "Full Time",
    skill: ["Salesforce", "CRM", "Apex", "Visualforce"],
    location: "New York, NY",
    applicants: [],
    applyCount: getRandomApplicants()
  },
  {
    title: "Network Engineer",
    org: "NetSecure",
    description: "NetSecure is seeking a Network Engineer to design, implement, and maintain network infrastructure. The ideal candidate will have experience with Cisco routers, switches, firewalls, and network security protocols. You will be responsible for ensuring network availability, performance, and security, as well as troubleshooting and resolving network issues. This full-time role in Dallas, TX, offers a competitive salary, benefits, and the opportunity to work on cutting-edge network solutions.",
    imageUrl: "https://example.com/network-engineer.jpg",
    minSalary: 90000,
    maxSalary: 130000,
    type: "Full Time",
    skill: ["Cisco", "Networking", "Firewalls", "Network Security"],
    location: "Dallas, TX",
    applicants: [],
    applyCount: getRandomApplicants()
  },
  {
    title: "Mobile App Tester",
    org: "AppCheck",
    description: "AppCheck is hiring a Mobile App Tester to ensure the quality and functionality of mobile applications. The ideal candidate will have experience in manual and automated testing of Android and iOS applications. You will be responsible for creating test cases, identifying bugs, and working closely with developers to resolve issues. This contract position in Seattle, WA, offers a competitive hourly rate, flexibility, and the opportunity to work on a variety of mobile apps.",
    imageUrl: "https://example.com/mobile-app-tester.jpg",
    minSalary: 50000,
    maxSalary: 80000,
    type: "Contract",
    skill: ["Mobile Testing", "Android", "iOS", "Selenium"],
    location: "Seattle, WA",
    applicants: [],
    applyCount: getRandomApplicants()
  },
  {
    title: "Technical Support Engineer",
    org: "HelpTech",
    description: "HelpTech is seeking a Technical Support Engineer to assist customers with troubleshooting and resolving technical issues. The ideal candidate should have experience with customer support, technical troubleshooting, and knowledge of various operating systems and networking. You will be responsible for providing timely and accurate support, creating documentation, and escalating issues when necessary. This full-time role in Orlando, FL, offers a competitive salary, benefits, and the opportunity to help customers succeed with our products.",
    imageUrl: "https://example.com/technical-support-engineer.jpg",
    minSalary: 60000,
    maxSalary: 90000,
    type: "Full Time",
    skill: ["Technical Support", "Troubleshooting", "Networking", "Linux"],
    location: "Orlando, FL",
    applicants: [],
    applyCount: getRandomApplicants()
  },
];


mongoose.connect("mongodb+srv://ved:admin@talenthive.lvzpxrj.mongodb.net/?retryWrites=true&w=majority&appName=talentHive", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const addRandomNum = (jobsArray) => {
  return jobsArray.map(job => ({
    ...job,
    randomNum: Math.floor(Math.random() * 17) + 1,
  }));
};

// Add randomNum to each job
const updatedJobs = addRandomNum(jobs);

const seedDB = async () => {
  await Job.deleteMany({});
  await Job.insertMany(updatedJobs);
  console.log("Database seeded!");
  mongoose.connection.close();
};

seedDB();
