package com.test.backend.Controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class HelloTest {

    @GetMapping("/hello")
    public String hello() {
        return "Hello from Spring Boot!";
    }
}