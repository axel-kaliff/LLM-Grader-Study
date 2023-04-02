import consents from './consents.json';

export default function getConsentingStudents({ years }: { years: number[] }) {
  // Get student ids from consents
  return consents
    .filter(([_, _1, year]) => years.includes(parseInt(year.slice(-2))))
    .map(([name, email, year]: [string, string, string]) => ({
      // Remove extra spaces from name
      name: name.replace(/\s+/g, ' ').trim(),
      id: email.split('@')[0].toLowerCase(),
      // Get only last two digits of year
      year: parseInt(year.slice(-2)),
    }));
}
