import 'dotenv/config';
import { connectDB } from './api/_lib/db.js';
import { Project, Certificate } from './api/_lib/models.js';

async function run() {
  await connectDB();
  const projects = await Project.find({});
  console.log('Projects URLs:');
  projects.forEach(p => console.log(p.imageUrl));
  
  const certs = await Certificate.find({});
  console.log('Certs URLs:');
  certs.forEach(c => console.log(c.imageUrl));
  process.exit(0);
}
run();
