// Mock data for diagnostic tests
export const diagnosticTests = [
  {
    id: 1,
    name: "Complete Blood Count (CBC)",
    description: "Comprehensive blood test to evaluate overall health and detect various disorders including anemia, infection, and leukemia.",
    price: 350,
    category: "blood tests",
    completionTime: 2,
    image: "/assets/service/service-1.png"
  },
  {
    id: 2,
    name: "Lipid Profile",
    description: "Measures cholesterol levels and triglycerides to assess cardiovascular health and risk of heart disease.",
    price: 450,
    category: "blood tests",
    completionTime: 3,
    image: "/assets/service/service-2.png"
  },
  {
    id: 3,
    name: "Thyroid Function Test",
    description: "Evaluates thyroid gland function by measuring TSH, T3, and T4 levels to diagnose thyroid disorders.",
    price: 650,
    category: "endocrinology",
    completionTime: 4,
    image: "/assets/service/service-3.png"
  },
  {
    id: 4,
    name: "ECG (Electrocardiogram)",
    description: "Records electrical activity of the heart to detect heart rhythm problems and cardiovascular conditions.",
    price: 200,
    category: "cardiology",
    completionTime: 1,
    image: "/assets/service/service-4.png"
  },
  {
    id: 5,
    name: "Chest X-Ray",
    description: "Imaging test to examine the chest, lungs, heart, and blood vessels for various conditions.",
    price: 400,
    category: "imaging",
    completionTime: 2,
    image: "/assets/service/service-6.jpg"
  },
  {
    id: 6,
    name: "MRI Brain",
    description: "Detailed imaging of the brain to detect tumors, strokes, multiple sclerosis, and other neurological conditions.",
    price: 8500,
    category: "neurology",
    completionTime: 8,
    image: "/assets/service/service-7.png"
  },
  {
    id: 7,
    name: "CT Scan Abdomen",
    description: "Cross-sectional imaging of abdominal organs to detect tumors, infections, and other abnormalities.",
    price: 4500,
    category: "imaging",
    completionTime: 6,
    image: "/assets/service/service-8.jpg"
  },
  {
    id: 8,
    name: "Ultrasound Abdomen",
    description: "Non-invasive imaging of abdominal organs using sound waves to detect various conditions.",
    price: 800,
    category: "imaging",
    completionTime: 2,
    image: "/assets/service/service-9.jpg"
  },
  {
    id: 9,
    name: "Diabetes Panel",
    description: "Comprehensive test including HbA1c, fasting glucose, and insulin levels to monitor diabetes.",
    price: 1200,
    category: "endocrinology",
    completionTime: 4,
    image: "/assets/service/service-10.jpg"
  },
  {
    id: 10,
    name: "Liver Function Test",
    description: "Measures liver enzymes and proteins to assess liver health and detect liver diseases.",
    price: 550,
    category: "gastroenterology",
    completionTime: 3,
    image: "/assets/service/service-1.png"
  },
  {
    id: 11,
    name: "Kidney Function Test",
    description: "Evaluates kidney function by measuring creatinine, BUN, and other markers.",
    price: 400,
    category: "blood tests",
    completionTime: 3,
    image: "/assets/service/service-2.png"
  },
  {
    id: 12,
    name: "Vitamin D Test",
    description: "Measures vitamin D levels to assess bone health and immune function.",
    price: 750,
    category: "blood tests",
    completionTime: 4,
    image: "/assets/service/service-3.png"
  },
  {
    id: 13,
    name: "Stress Test (TMT)",
    description: "Exercise stress test to evaluate heart function under physical stress.",
    price: 1200,
    category: "cardiology",
    completionTime: 3,
    image: "/assets/service/service-4.png"
  },
  {
    id: 14,
    name: "Echocardiogram",
    description: "Ultrasound of the heart to assess heart structure and function.",
    price: 1500,
    category: "cardiology",
    completionTime: 2,
    image: "/assets/service/service-6.jpg"
  },
  {
    id: 15,
    name: "Mammography",
    description: "X-ray imaging of breast tissue to detect breast cancer and other abnormalities.",
    price: 2000,
    category: "oncology",
    completionTime: 2,
    image: "/assets/service/service-7.png"
  },
  {
    id: 16,
    name: "Pap Smear",
    description: "Screening test for cervical cancer and other cervical abnormalities.",
    price: 600,
    category: "oncology",
    completionTime: 3,
    image: "/assets/service/service-8.jpg"
  },
  {
    id: 17,
    name: "Spirometry",
    description: "Lung function test to measure breathing capacity and detect respiratory conditions.",
    price: 800,
    category: "pulmonology",
    completionTime: 2,
    image: "/assets/service/service-9.jpg"
  },
  {
    id: 18,
    name: "Skin Biopsy",
    description: "Removal of small skin sample for microscopic examination to diagnose skin conditions.",
    price: 1200,
    category: "dermatology",
    completionTime: 5,
    image: "/assets/service/service-10.jpg"
  },
  {
    id: 19,
    name: "Bone Density Scan",
    description: "Measures bone mineral density to assess osteoporosis risk and bone health.",
    price: 1800,
    category: "imaging",
    completionTime: 3,
    image: "/assets/service/service-1.png"
  },
  {
    id: 20,
    name: "Colonoscopy",
    description: "Examination of the colon and rectum to detect polyps, cancer, and other conditions.",
    price: 8000,
    category: "gastroenterology",
    completionTime: 4,
    image: "/assets/service/service-2.png"
  }
];

// Mock data for full body checkup packages
export const fullBodyPackages = [
  {
    id: 1,
    name: "Basic Health Checkup",
    description: "Essential health screening package including basic blood tests, urine analysis, and vital signs assessment.",
    price: 1200,
    originalPrice: 1500,
    numberOfTests: 8,
    completionTime: 3,
    image: "/assets/service/service-1.png",
    isPopular: false
  },
  {
    id: 2,
    name: "Comprehensive Health Package",
    description: "Complete health assessment including blood tests, imaging, cardiac evaluation, and diabetes screening.",
    price: 3500,
    originalPrice: 4200,
    numberOfTests: 15,
    completionTime: 6,
    image: "/assets/service/service-2.png",
    isPopular: true
  },
  {
    id: 3,
    name: "Executive Health Checkup",
    description: "Premium health package designed for executives with comprehensive testing including advanced imaging and specialized tests.",
    price: 8500,
    originalPrice: 10000,
    numberOfTests: 25,
    completionTime: 8,
    image: "/assets/service/service-3.png",
    isPopular: false
  },
  {
    id: 4,
    name: "Senior Citizen Package",
    description: "Specialized health package for senior citizens focusing on age-related health concerns and chronic disease monitoring.",
    price: 2800,
    originalPrice: 3200,
    numberOfTests: 18,
    completionTime: 5,
    image: "/assets/service/service-4.png",
    isPopular: false
  },
  {
    id: 5,
    name: "Women's Health Package",
    description: "Comprehensive health screening specifically designed for women including gynecological tests and breast health screening.",
    price: 4500,
    originalPrice: 5200,
    numberOfTests: 20,
    completionTime: 6,
    image: "/assets/service/service-6.jpg",
    isPopular: true
  },
  {
    id: 6,
    name: "Men's Health Package",
    description: "Complete health assessment for men including prostate screening, cardiac evaluation, and testosterone levels.",
    price: 4200,
    originalPrice: 4800,
    numberOfTests: 19,
    completionTime: 5,
    image: "/assets/service/service-7.png",
    isPopular: false
  },
  {
    id: 7,
    name: "Diabetes Care Package",
    description: "Specialized package for diabetes management including comprehensive glucose monitoring and complication screening.",
    price: 2200,
    originalPrice: 2600,
    numberOfTests: 12,
    completionTime: 4,
    image: "/assets/service/service-8.jpg",
    isPopular: false
  },
  {
    id: 8,
    name: "Heart Care Package",
    description: "Comprehensive cardiac health assessment including stress test, echocardiogram, and advanced lipid profiling.",
    price: 3800,
    originalPrice: 4500,
    numberOfTests: 16,
    completionTime: 5,
    image: "/assets/service/service-9.jpg",
    isPopular: true
  },
  {
    id: 9,
    name: "Cancer Screening Package",
    description: "Early detection package for common cancers including breast, cervical, prostate, and colorectal screening.",
    price: 5500,
    originalPrice: 6500,
    numberOfTests: 22,
    completionTime: 7,
    image: "/assets/service/service-10.jpg",
    isPopular: false
  },
  {
    id: 10,
    name: "Wellness Plus Package",
    description: "Ultimate wellness package combining preventive care, lifestyle assessment, and comprehensive health monitoring.",
    price: 12000,
    originalPrice: 15000,
    numberOfTests: 35,
    completionTime: 10,
    image: "/assets/service/service-1.png",
    isPopular: false
  }
];
