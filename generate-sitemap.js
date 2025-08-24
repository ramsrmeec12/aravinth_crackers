const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');

// 1️⃣ List all routes of your website
const links = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/products', changefreq: 'weekly', priority: 0.8 },
  { url: '/contact', changefreq: 'monthly', priority: 0.5 },
  // add more pages as needed
];

// 2️⃣ Create a sitemap stream
const sitemap = new SitemapStream({ hostname: 'https://aravinthcrackers.in' });

// 3️⃣ Pipe the sitemap stream directly to a file
const writeStream = createWriteStream('./public/sitemap.xml');
sitemap.pipe(writeStream);

// 4️⃣ Write all links to the sitemap
links.forEach(link => sitemap.write(link));

// 5️⃣ Close the sitemap stream
sitemap.end();

// 6️⃣ Convert stream to promise just to log when done
streamToPromise(sitemap)
  .then(() => console.log('Sitemap generated successfully!'))
  .catch(err => console.error(err));
