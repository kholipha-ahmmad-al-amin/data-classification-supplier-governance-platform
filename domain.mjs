export class ClassificationError extends Error { constructor(code, message) { super(message); this.code = code; } }
const role = (actor, required) => { if (actor.role !== required) throw new ClassificationError('FORBIDDEN', 'The actor is not authorized for this supplier classification transition.'); };
export function createClassificationRegistry() {
  const assets = new Map(); const audit = [];
  const log = (action, id, actor) => audit.push({ id: `AUD-${audit.length + 1}`, action, assetId: id, actor });
  const get = id => { const asset = assets.get(id); if (!asset) throw new ClassificationError('NOT_FOUND', 'The supplier data asset was not found.'); return asset; };
  return {
    register(actor, input) { role(actor, 'data-steward'); if (!/^CLS-[A-Z0-9]{3,}$/.test(input.id || '') || !input.supplier || !['public', 'internal', 'confidential', 'restricted'].includes(input.classification)) throw new ClassificationError('VALIDATION', 'Identifier, supplier, and supported classification are required.'); if (assets.has(input.id)) throw new ClassificationError('CONFLICT', 'The supplier data asset already exists.'); const asset = { id: input.id, supplier: input.supplier, classification: input.classification, state: 'draft' }; assets.set(asset.id, asset); log('asset.registered', asset.id, actor.id); return { ...asset }; },
    approve(actor, id, evidence) { role(actor, 'data-governor'); const asset = get(id); if (asset.state !== 'draft') throw new ClassificationError('CONFLICT', 'Only draft data assets can be approved.'); if (!evidence || evidence.length < 25) throw new ClassificationError('VALIDATION', 'Classification evidence is required.'); asset.state = 'approved'; log('asset.approved', id, actor.id); return { ...asset }; },
    handle(actor, id, channel) { role(actor, 'data-runtime'); const asset = get(id); if (asset.state !== 'approved') throw new ClassificationError('CONFLICT', 'Only approved data assets can be handled.'); const allowed = asset.classification !== 'restricted' || channel === 'secure'; log(allowed ? 'handling.allowed' : 'handling.denied', id, actor.id); return { allowed }; },
    retire(actor, id, reason) { role(actor, 'data-governor'); const asset = get(id); if (asset.state !== 'approved') throw new ClassificationError('CONFLICT', 'Only approved data assets can retire.'); if (!reason || reason.length < 15) throw new ClassificationError('VALIDATION', 'A detailed retirement reason is required.'); asset.state = 'retired'; log('asset.retired', id, actor.id); return { ...asset }; },
    count: () => assets.size,
    audit: () => audit.map(item => ({ ...item }))
  };
}
