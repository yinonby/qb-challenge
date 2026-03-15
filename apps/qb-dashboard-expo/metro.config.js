
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');
const fs = require('fs');

// Helper: get all first-level subfolders of a folder
function getSubfolders(folderPath) {
  return fs.readdirSync(folderPath)
    .map(name => path.join(folderPath, name))
    .filter(f => fs.statSync(f).isDirectory());
}

// Recursively collect all nested subfolders
function getAllSubfolders(rootFolders) {
  const result = [];
  rootFolders.forEach(folder => {
    result.push(folder);
    const nested = getSubfolders(folder);
    if (nested.length) {
      result.push(...getAllSubfolders(nested));
    }
  });
  return result;
}

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');
const packagesRoot = path.resolve(projectRoot, '../../packages');

const config = getDefaultConfig(projectRoot);

// Start from top-level packages/* (lib, ui, etc.)
const topLevelFolders = getSubfolders(packagesRoot);
const watchFolders = getAllSubfolders(topLevelFolders);

config.watchFolders = watchFolders;

config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

config.resolver.disableHierarchicalLookup = true;

module.exports = config;
