import fs from 'fs';
import path from 'path';

// Load projects detail data from individual JSON files
export function loadProjectsData() {
  const projectsDir = path.join(process.cwd(), 'src/_data/projects');
  const imagesDir = path.join(process.cwd(), 'src/assets/images/projects');

  const projectFiles = fs.readdirSync(projectsDir).filter(file => file.endsWith('.json'));
  const projects = {};

  projectFiles.forEach(file => {
    const projectKey = path.basename(file, '.json');
    const projectPath = path.join(projectsDir, file);
    const projectData = JSON.parse(fs.readFileSync(projectPath, 'utf8'));

    const projectImagesDir = path.join(imagesDir, projectKey);
    let images = [];

    if (fs.existsSync(projectImagesDir)) {
      images = fs.readdirSync(projectImagesDir)
        .filter(file => /\.(png|jpg|jpeg|gif|webp)$/i.test(file))
        .sort();
    }

    projectData.slideshow = images;
    projects[projectKey] = projectData;
  });

  return projects;
}

// Load services array from services.json (for services page grid)
export function loadServicesArray() {
  const servicesPath = path.join(process.cwd(), 'src/_data/services.json');
  const imagesDir = path.join(process.cwd(), 'src/assets/images/services');
  const services = JSON.parse(fs.readFileSync(servicesPath, 'utf8'));

  // For each service, dynamically load images from its folder
  services.forEach(service => {
    const serviceKey = service.link.replace('.html', '');
    const serviceImagesDir = path.join(imagesDir, serviceKey);
    let images = [];

    if (fs.existsSync(serviceImagesDir)) {
      images = fs.readdirSync(serviceImagesDir)
        .filter(file => /\.(png|jpg|jpeg|gif|webp)$/i.test(file))
        .sort();
    }

    service.images = images;
  });

  return services;
}

// Load services detail data from individual JSON files
export function loadServicesData() {
  const servicesDir = path.join(process.cwd(), 'src/_data/services');
  const imagesDir = path.join(process.cwd(), 'src/assets/images/services');

  const serviceFiles = fs.readdirSync(servicesDir).filter(file => file.endsWith('.json'));
  const services = {};

  serviceFiles.forEach(file => {
    const serviceKey = path.basename(file, '.json');
    const servicePath = path.join(servicesDir, file);
    const serviceData = JSON.parse(fs.readFileSync(servicePath, 'utf8'));

    const serviceImagesDir = path.join(imagesDir, serviceKey);
    let images = [];

    if (fs.existsSync(serviceImagesDir)) {
      images = fs.readdirSync(serviceImagesDir)
        .filter(file => /\.(png|jpg|jpeg|gif|webp)$/i.test(file))
        .sort();
    }

    serviceData.slideshow = images;
    services[serviceKey] = serviceData;
  });

  return services;
}

// Load BIM packages array from bim-packages.json
export function loadBimPackagesArray() {
  const packagesPath = path.join(process.cwd(), 'src/_data/bim-packages.json');
  const packages = JSON.parse(fs.readFileSync(packagesPath, 'utf8'));
  return packages;
}

// Load software images array from software folder
export function loadSoftwareImages() {
  const softwareDir = path.join(process.cwd(), 'src/assets/images/software');
  const images = fs.readdirSync(softwareDir)
    .filter(file => /\.(png|jpg|jpeg|gif|webp)$/i.test(file))
    .sort((a, b) => {
      // Sort numerically: software1.png, software2.png, etc.
      const numA = parseInt(a.match(/\d+/)[0]);
      const numB = parseInt(b.match(/\d+/)[0]);
      return numA - numB;
    });

  return images;
}