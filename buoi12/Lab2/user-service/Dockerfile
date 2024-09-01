FROM maven:3.9.8-eclipse-temurin-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean install -DskipTests

FROM openjdk:17
WORKDIR /app
COPY --from=build /app/target/hehe.jar /app/app.jar
EXPOSE 8080
ENTRYPOINT [ "java","-jar","/app/app.jar" ]

