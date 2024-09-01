package com.example.be;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class BeApplication {

  @Value("${spring.application.name}")
  private String name;

  public static void main(String[] args) {
    SpringApplication.run(BeApplication.class, args);
  }


  @Bean
  public PasswordEncoder passwordEncoder() {
    System.out.println("Name: " + name);
    return new BCryptPasswordEncoder();
  }

}
