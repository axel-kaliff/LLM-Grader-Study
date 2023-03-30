import consents from './consents.json';

// Consents are in form of: [ "studentId@kth.se", year]

export default function getConsentingStudents({ years }: { years: number[] }) {
  // Get student ids from consents
  return consents.map(([name, email, year]: [string, string, string]) => ({
    // Remove extra spaces from name
    name: name.replace(/\s+/g, ' ').trim(),
    id: email.split('@')[0].toLowerCase(),
    // Get only last two digits of year
    year: parseInt(year.slice(-2)),
  }));
}
