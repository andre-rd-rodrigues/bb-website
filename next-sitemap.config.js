/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://barbizanicarvalholaw.com",
  generateRobotsTxt: true,
  additionalPaths: async (config) => {
    const paths = [];
    const defaultPaths = await config.transform(config, "/");
    paths.push(defaultPaths);
    // Add .pt domain URLs
    paths.push({
      loc: "https://barbizanicarvalholaw.pt",
      lastmod: new Date().toISOString(),
      priority: 0.7
    });
    paths.push({
      loc: "https://barbizanicarvalholaw.pt/contacts",
      lastmod: new Date().toISOString(),
      priority: 0.7
    });
    paths.push({
      loc: "https://barbizanicarvalholaw.pt/404",
      lastmod: new Date().toISOString(),
      priority: 0.7
    });
    paths.push({
      loc: "https://barbizanicarvalholaw.pt/en/404",
      lastmod: new Date().toISOString(),
      priority: 0.7
    });
    paths.push({
      loc: "https://barbizanicarvalholaw.pt/en/contacts",
      lastmod: new Date().toISOString(),
      priority: 0.7
    });
    paths.push({
      loc: "https://barbizanicarvalholaw.pt/about",
      lastmod: new Date().toISOString(),
      priority: 0.7
    });
    paths.push({
      loc: "https://barbizanicarvalholaw.pt/en/about",
      lastmod: new Date().toISOString(),
      priority: 0.7
    });
    paths.push({
      loc: "https://barbizanicarvalholaw.pt/en",
      lastmod: new Date().toISOString(),
      priority: 0.7
    });
    paths.push({
      loc: "https://barbizanicarvalholaw.pt/practice-areas",
      lastmod: new Date().toISOString(),
      priority: 0.7
    });
    paths.push({
      loc: "https://barbizanicarvalholaw.pt/en/practice-areas",
      lastmod: new Date().toISOString(),
      priority: 0.7
    });
    return paths;
  }
};
