package com.miru.WebFitnessApplication.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/getAll")
    public List<User> list(){
        return userService.listAll();
    }

    @PostMapping("/add")
    public String add(@RequestBody User student){
        userService.save(student);
        return "New User Added";
    }

    @GetMapping("/{id}")
        public ResponseEntity<User> get(@PathVariable Integer id) {
        try {
            User user = userService.get(id);
            return new ResponseEntity<User>(user, HttpStatus.OK);

        } catch (NoSuchElementException e) {
            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> update(@RequestBody User user,@PathVariable Integer id){
        try {
            User existingUser = userService.get(id);
            if (existingUser != null) {
                existingUser.setName(user.getName());
                existingUser.setAge(user.getAge());
                existingUser.setGender(user.getGender());
                existingUser.setHeight(user.getHeight());
                existingUser.setWeight(user.getWeight());
                existingUser.setGoal(user.getGoal());
                existingUser.setActivity(user.getActivity());
                userService.save(existingUser);

                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Integer id){
        userService.delete(id);
        return "Deleted User with id "+id;
    }

}
