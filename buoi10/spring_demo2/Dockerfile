FROM maven:3.9.8-eclipse-temurin-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean install -DskipTests

FROM openjdk:17
WORKDIR /app
COPY --from=build /app/target/haha.jar /app/app.jar
EXPOSE 9090
ENV spring-name="xin chào, hehehe. tổng của 2 số 5 và 3 = "
ENTRYPOINT [ "java","-jar","/app/app.jar" ]