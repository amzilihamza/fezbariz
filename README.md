# Fez & Bariz — boutique de vêtements artisanaux marocains

Site e-commerce sur-mesure (hors Shopify) pour la vente de jellabas, jabadors et caftans artisanaux. Next.js (App Router) + TypeScript + Tailwind CSS, FR/EN, panier persistant, paiement Stripe.

## Démarrer en local

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Paiement (Stripe)

Copier `.env.example` en `.env.local` et renseigner `STRIPE_SECRET_KEY` (clé secrète depuis le dashboard Stripe). Sans cette clé, le bouton "Passer la commande" affiche un message d'erreur propre au lieu de planter.

> Note : Stripe n'a pas de compte marchand natif pour le Maroc. Si la société n'a pas d'entité aux US/UE, il faudra soit passer par une structure éligible, soit prévoir une passerelle alternative (CMI pour le marché marocain, ou un agrégateur type Payoneer/2Checkout) pour l'encaissement.

## Ajouter de vrais produits et photos

Toutes les fiches produits sont dans `src/data/products.json` (un objet par produit, avec traductions FR/EN). Pour ajouter un produit :

1. Ajouter les photos dans `public/images/products/<nom-produit>/` (remplacer les SVG placeholders de `public/images/placeholders/`).
2. Ajouter une entrée dans `src/data/products.json` en suivant le modèle `src/types/product.ts` (nom, description, matières, prix, tailles, couleurs, images...).
3. Le produit apparaît automatiquement dans la boutique et sur sa fiche dédiée (`/produits/<slug>`).

Cette approche fichiers est volontairement simple pour démarrer rapidement ; une vraie base de données + panel d'administration pourra être ajoutée plus tard si le catalogue grossit.

## Structure du projet

- `src/app/[locale]/` — pages du site (accueil, boutique, fiche produit, panier, à propos, contact, confirmation de commande)
- `src/app/api/checkout/` — création de session Stripe Checkout
- `src/components/` — composants UI (header, footer, carte produit, panier...)
- `src/lib/` — logique métier (panier, accès aux produits, formatage prix)
- `src/data/products.json` — catalogue produits
- `src/messages/{fr,en}.json` — traductions

## Déploiement

Le projet est un site Next.js standard, déployable sur Vercel, ou tout hébergeur supportant Node.js (avec `npm run build && npm run start`).
