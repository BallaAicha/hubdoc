# 🚀 Guide d'Installation Spring Backend

## 📋 Aperçu

Ce guide détaille le processus d'installation et de configuration d'un environnement de développement Spring Backend.

> ℹ️ **Info:** Suivez attentivement chaque étape pour garantir une installation réussie.

## 🛠️ Prérequis

### Environnement de développement

| Outil          | Version minimale | Description                           |
|----------------|------------------|---------------------------------------|
| JDK            | 17 ou plus      | Java Development Kit                  |
| Maven          | 3.8.x           | Gestionnaire de dépendances           |
| IDE            | -               | IntelliJ IDEA ou Eclipse recommandés  |
| Git            | 2.x             | Système de contrôle de version        |

### Configuration système recommandée

| Ressource      | Minimum         | Recommandé      |
|----------------|-----------------|-----------------|
| RAM            | 8 GB           | 16 GB           |
| Processeur     | 2 cœurs        | 4 cœurs         |
| Espace disque  | 10 GB          | 20 GB           |

## 📥 Installation étape par étape

### 1. Installation du JDK

#### Windows
```bash
# Téléchargez le JDK depuis le site officiel d'Oracle ou utilisez:
winget install Microsoft.OpenJDK.17
```

#### macOS
```bash
# Avec Homebrew
brew install openjdk@17
```

#### Linux
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install openjdk-17-jdk
```

### 2. Installation de Maven

#### Windows
```bash
# Téléchargez Maven depuis apache.maven.org ou utilisez:
winget install Apache.Maven
```

#### macOS
```bash
brew install maven
```

#### Linux
```bash
sudo apt install maven
```

### 3. Configuration du projet

1. Clonez le dépôt :
```bash
git clone https://github.com/votre-organisation/votre-projet.git
cd votre-projet
```

2. Configurez les variables d'environnement :

```properties
# application.properties
spring.datasource.url=jdbc:postgresql://localhost:5432/db_name
spring.datasource.username=your_username
spring.datasource.password=your_password
```

3. Installez les dépendances :
```bash
mvn clean install
```

## ▶️ Démarrage du projet

### Lancement en mode développement

```bash
mvn spring-boot:run
```

### Construction du projet

```bash
mvn clean package
```

### Exécution des tests

```bash
mvn test
```

## 🔍 Vérification de l'installation

1. Accédez à l'interface Swagger :
```
http://localhost:8080/swagger-ui.html
```

2. Vérifiez les endpoints de santé :
```
http://localhost:8080/actuator/health
```

## ⚠️ Résolution des problèmes courants

| Problème                           | Solution                                                    |
|-----------------------------------|-------------------------------------------------------------|
| Port 8080 déjà utilisé            | Modifiez le port dans `application.properties`              |
| Erreur de connexion à la BDD      | Vérifiez les credentials et la disponibilité de la BDD     |
| Erreur de compilation Maven       | Nettoyez le cache Maven : `mvn clean`                      |

## 📚 Configuration avancée

### Configuration de la base de données

```yaml
# application.yml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/db_name
    username: ${DB_USERNAME}
    password: ${DB_PASSWORD}
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
```

### Configuration de la sécurité

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/public/**").permitAll()
                .anyRequest().authenticated()
            );
        return http.build();
    }
}
```

## 🔗 Liens utiles

* [Documentation Spring](https://docs.spring.io/spring-boot/docs/current/reference/html/)
* [Guides Spring](https://spring.io/guides)
* [Maven Documentation](https://maven.apache.org/guides/)

## 📞 Support

Pour toute assistance supplémentaire :
- 📧 Email: support@example.com
- 💬 Chat: [Slack Community](https://slack.example.com)
- 📚 Wiki: [Documentation interne](https://wiki.example.com)

---

> 🔒 **Note de sécurité:**
> - Ne partagez jamais vos credentials de production
> - Utilisez des variables d'environnement pour les informations sensibles
> - Activez toujours HTTPS en production