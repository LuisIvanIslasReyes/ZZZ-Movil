"""
Script para resetear la base de datos ZZZ completamente.
"""
import psycopg2
from psycopg2 import sql
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

# Configuración de conexión
DB_NAME = 'ZZZ'
DB_USER = 'postgres'
DB_PASSWORD = ''  # Sin contraseña según tu .env
DB_HOST = 'localhost'
DB_PORT = '5432'

def reset_database():
    """Elimina y recrea la base de datos ZZZ."""
    try:
        # Conectar a la base de datos por defecto 'postgres'
        conn = psycopg2.connect(
            dbname='postgres',
            user=DB_USER,
            password=DB_PASSWORD,
            host=DB_HOST,
            port=DB_PORT
        )
        conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cursor = conn.cursor()
        
        print(f"🗑️  Eliminando base de datos '{DB_NAME}'...")
        
        # Terminar todas las conexiones activas
        cursor.execute(f"""
            SELECT pg_terminate_backend(pg_stat_activity.pid)
            FROM pg_stat_activity
            WHERE pg_stat_activity.datname = '{DB_NAME}'
            AND pid <> pg_backend_pid();
        """)
        
        # Eliminar la base de datos
        cursor.execute(sql.SQL("DROP DATABASE IF EXISTS {}").format(
            sql.Identifier(DB_NAME)
        ))
        print(f"✅ Base de datos '{DB_NAME}' eliminada")
        
        # Crear la base de datos nuevamente
        print(f"🔨 Creando base de datos '{DB_NAME}'...")
        cursor.execute(sql.SQL("CREATE DATABASE {}").format(
            sql.Identifier(DB_NAME)
        ))
        print(f"✅ Base de datos '{DB_NAME}' creada exitosamente")
        
        cursor.close()
        conn.close()
        
        print("\n✨ Reset completado. Ahora ejecuta:")
        print("   python manage.py makemigrations")
        print("   python manage.py migrate")
        print("   python manage.py createsuperuser")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        return False
    
    return True

if __name__ == '__main__':
    reset_database()
