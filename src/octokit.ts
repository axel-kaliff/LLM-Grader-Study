import { Octokit } from 'octokit';
import dotenv from 'dotenv';

// Use dotenv to read .env vars into Node
dotenv.config();

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
  baseUrl: 'https://gits-15.sys.kth.se/api/v3',
});

export default octokit;
