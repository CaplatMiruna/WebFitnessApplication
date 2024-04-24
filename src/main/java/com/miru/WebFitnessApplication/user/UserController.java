package com.miru.WebFitnessApplication.user;
import com.miru.WebFitnessApplication.calculator.CalculatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private CalculatorService calculatorService;

    @GetMapping("/getAll")
    public List<User> list(){
        return userService.listAll();
    }

    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> add(@RequestBody User user) {
        try {
            userService.save(user);
            Integer bmr = calculatorService.calculateBMR(user);
            Double bmi = calculatorService.calculateBMI(user);
            int[] macronutrients = calculatorService.calculateMacronutrients(user);

            Map<String, Object> result = new HashMap<>();
            result.put("bmi", bmi);
            result.put("bmr", bmr);
            result.put("protein", macronutrients[0]);
            result.put("carbs", macronutrients[1]);
            result.put("fat", macronutrients[2]);

            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("error", "Failed to add user: " + e.getMessage()));
        }
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
