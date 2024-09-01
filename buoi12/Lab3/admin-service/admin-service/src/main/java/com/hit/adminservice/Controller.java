package com.hit.adminservice;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/admin/api/v1")
@RestController
public class Controller {

  @GetMapping
  public String get() {
    return "Hello, đây là api của admin service";
  }

}
