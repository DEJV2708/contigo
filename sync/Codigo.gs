// Contigo — servidor de sincronización (Google Apps Script).
// Guarda los datos de cada equipo YA CIFRADOS: este servidor nunca ve el código ni el contenido.
// Un archivo por cuenta de sincronización en la carpeta "Contigo sync" de Google Drive.
// Implementar como: Implementar → Nueva implementación → Aplicación web
//   Ejecutar como: Yo   ·   Quién tiene acceso: Cualquier persona
const CARPETA = 'Contigo sync';

function carpeta_() {
  const it = DriveApp.getFoldersByName(CARPETA);
  return it.hasNext() ? it.next() : DriveApp.createFolder(CARPETA);
}
function archivo_(id, crear) {
  const dir = carpeta_(), it = dir.getFilesByName(id + '.json');
  if (it.hasNext()) return it.next();
  return crear ? dir.createFile(id + '.json', '{}', 'application/json') : null;
}
function leer_(f) { try { return JSON.parse(f.getBlob().getDataAsString() || '{}'); } catch (e) { return {}; } }
function json_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }

function doGet() { return json_({ ok: true, app: 'contigo-sync' }); }

function doPost(e) {
  try {
    const q = JSON.parse(e.postData.contents);
    if (!/^[a-f0-9]{64}$/.test(String(q.id))) return json_({ ok: false, error: 'id' });
    if (q.a === 'get') {
      const f = archivo_(q.id, false), db = f ? leer_(f) : {}, since = Number(q.since) || 0, docs = {};
      let max = since;
      Object.keys(db).forEach(k => { if (db[k].s > since) docs[k] = db[k]; max = Math.max(max, db[k].s || 0); });
      return json_({ ok: true, docs: docs, s: max });
    }
    if (q.a === 'put') {
      const lock = LockService.getScriptLock(); lock.waitLock(20000);
      try {
        const f = archivo_(q.id, true), db = leer_(f), now = Date.now(); let n = 0;
        Object.keys(q.docs || {}).forEach(k => {
          if (!/^[\w.:-]{1,40}$/.test(k)) return;
          const d = q.docs[k], ts = Number(d.ts) || 0;
          if (!db[k] || ts >= (db[k].ts || 0)) { db[k] = { ts: ts, c: String(d.c), s: now }; n++; }
        });
        f.setContent(JSON.stringify(db));
        return json_({ ok: true, s: now, n: n });
      } finally { lock.releaseLock(); }
    }
    return json_({ ok: false, error: 'accion' });
  } catch (err) { return json_({ ok: false, error: String(err) }); }
}
