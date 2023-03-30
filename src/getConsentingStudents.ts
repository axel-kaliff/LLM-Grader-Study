import consents from './consents.json';

// Consents are in form of: [ "studentId@kth.se", year]

export default function getConsentingStudents({ years }: { years: number[] }) {
  // Get student ids from consents
  const studentIds = (consents as [string, number][])
    .filter((consent) => years.includes(consent[1]))
    .map((consent) => consent[0].split('@')[0].toLowerCase());
  return studentIds;
}
