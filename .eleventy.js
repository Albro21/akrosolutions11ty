import { loadProjectsArray, loadProjectsData, loadServicesArray, loadServicesData, loadSoftwareImages, loadBimPackagesArray } from './src/utils/helpers.js';

export default function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  // Add global data
  eleventyConfig.addGlobalData("site", {
    lastModified: new Date().toISOString().split('T')[0] // YYYY-MM-DD format
  });

  // Load dynamic data
  const projectsData = loadProjectsArray();
  const projectsDetailData = loadProjectsData();
  const servicesDetailData = loadServicesData();
  const servicesData = loadServicesArray();
  const softwareImages = loadSoftwareImages();
  const bimPackagesData = loadBimPackagesArray();
  
  eleventyConfig.addGlobalData("projectsList", projectsData);
  eleventyConfig.addGlobalData("projectsDetail", projectsDetailData);
  eleventyConfig.addGlobalData("servicesDetail", servicesDetailData);
  eleventyConfig.addGlobalData("servicesList", servicesData);
  eleventyConfig.addGlobalData("softwareImages", softwareImages);
  eleventyConfig.addGlobalData("bimPackagesData", bimPackagesData);

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_includes/layouts"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};