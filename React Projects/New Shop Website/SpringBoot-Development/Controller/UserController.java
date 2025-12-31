package com.test.backend.Controller;

import com.test.backend.Model.User;
import com.test.backend.Persistence.UserBack;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserBack userBack;

    @PostMapping("/create")
    public ResponseEntity<String> createUser(@RequestBody User user) {
        try{
            System.out.println(user.getUsername() + " " + user.getPassword() + " Received");
            userBack.createUser(user);
            return new ResponseEntity<>("Success", HttpStatus.OK);
        } catch(IOException e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping("/test")
    public void test(){
        System.out.println("test");
    }
}
