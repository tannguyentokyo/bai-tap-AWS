package com.example.spring_demo2;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//import com.example.spring_demo2.model.hocsinh;
@RestController
public class test {
//	@Autowired com.example.spring_demo2.service.hocsinh mhocsinh;
	@Value("${spring.application.name:default}")
	private String hehe;
	
	@RequestMapping("/a")
	public String tinhTong() {
		return hehe+" "+ (1+2+5);
	}

//	@GetMapping("/list")
//	public ArrayList<hocsinh>list(){
//		return mhocsinh.list();
//	}
}
