FROM maven:3.8.6-jdk-11 AS build

WORKDIR /build_app
COPY . .
RUN mvn clean install -DskipTests




FROM openjdk:11  
WORKDIR /app
COPY --from=build /build_app/target/spring_demo.jar /app/spring_demo.jar
# COPY /target/. /app/.
EXPOSE 5000
ENV spring_demo_20240811="xin chào 20240811 abc"

ENTRYPOINT [ "java","-jar","/app/spring_demo.jar" ]