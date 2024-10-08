package com.example.spring_demo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {

@Value("${spring.application.name:default}")
private String appName;

  @GetMapping("/hello")
  public String hello(@RequestParam("message") String message) {
    return appName + " Hihi " + message;
  }

}
