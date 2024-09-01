FROM maven:3.9.8-eclipse-temurin-17 AS build
WORKDIR /app_build
COPY . .
RUN mvn clean install -DskipTests

FROM openjdk:17
WORKDIR /app
COPY --from=build /app_build/target/haha.jar /app.jar
EXPOSE 8080
ENTRYPOINT [ "java","-jar","/app.jar" ]