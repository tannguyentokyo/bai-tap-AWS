package com.example.spring_demo1;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
public class test {
	// test 1234567
	@RequestMapping("/a")
	public int tinhTong() {
		return 1+2+5;
	}
}
