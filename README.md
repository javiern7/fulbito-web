
## README Front (fulbito-web/README.md)
```md
# fulbito-web (Sprint 1)

## Requisitos
- Node + npm
- Angular CLI 20

## Instalar y levantar
```bash
npm install
ng serve -o

Known issue:
- npm audit reports high severity vulnerability in tar dependency
- Comes from @angular/cli -> pacote -> tar
- Build-time only, no runtime exposure
- Fix requires Angular CLI 21 (breaking change)
- Will be addressed on Angular major upgrade
