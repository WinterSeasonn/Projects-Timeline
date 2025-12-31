package com.test.backend.Persistence;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.test.backend.Model.User;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class UserBack {

    private final ObjectMapper objectMapper;
    private final String filepath = "src/main/java/com/test/backend/data/user.json";

    public UserBack() {
        this.objectMapper = new ObjectMapper();
        this.objectMapper.enable(SerializationFeature.INDENT_OUTPUT);
    }

    private List<User> readUsersData() throws IOException {
        File file = new File(filepath);
        if(!file.exists()){
            return new ArrayList<>();
        }
        User[] userArray = objectMapper.readValue(file, User[].class);
        return new ArrayList<>(Arrays.asList(userArray));
    }

    private void writeUsersData(List<User> users) throws IOException {
        File file = new File(filepath);
        objectMapper.writeValue(file, users);
    }

    private void saveUsersData(User user) throws IOException {
        List<User> users = readUsersData();
        users.add(user);
        writeUsersData(users);
        System.out.println(readUsersData() + "check");
    }

    public void createUser(User user) throws IOException {
        if(user == null || user.getUsername() == null || user.getPassword() == null){
            throw new IllegalArgumentException("Name cannot be empty or user doesn't exist");
        }
        saveUsersData(user);
    }
}
