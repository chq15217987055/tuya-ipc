export default function escapeJson (data) {
  return data
    .replace(/\\/g, '')
    .replace(/\"{/g, '{')
    .replace(/}\"/g, '}');
}