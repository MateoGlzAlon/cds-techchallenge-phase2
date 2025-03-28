FROM gradle:8.1.1-jdk17

WORKDIR /opt/app

COPY --chown=gradle:gradle . .

# Compila el proyecto sin tests
RUN gradle build --no-daemon -x test

ENV PROFILE=docker
ENV JAVA_OPTS="-Xmx512m -Xms256m"

# Ejecuta el jar con las opciones de memoria y perfil
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -Dspring.profiles.active=$PROFILE -jar build/libs/backend-0.0.1-SNAPSHOT.jar"]
