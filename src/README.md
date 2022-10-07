# Presentaicón de funcionamiento del Foro
https://youtu.be/J_vZpvzO61k

## Guía para levantar el proyecto después del git clone
- Correr una instancia de la base de datos (src/database/foroggdatabase.sql).
- npm start en back (src/api).
- npm start en front (src/website).
- Cambio de credenciales en el .env (e de datos y secret del token):
  paradigm_api__mysql__host='localhost'
  paradigm_api__mysql__user='root'
  paradigm_api__mysql__password=''
  paradigm_api__mysql__database='forogg_database'
  paradigm_api__jwt__secret='[agregue su secret aquí]'

