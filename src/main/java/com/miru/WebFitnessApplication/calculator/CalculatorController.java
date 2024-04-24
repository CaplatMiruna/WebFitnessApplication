package com.miru.WebFitnessApplication.calculator;

import com.miru.WebFitnessApplication.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/calculator")
public class CalculatorController {

    @Autowired
    private CalculatorService calculatorService;

    @PostMapping("/bmr")
    public ResponseEntity<Integer> calculateBMR(@RequestBody User user) {
        try {
            Integer bmr = calculatorService.calculateBMR(user);
            if (bmr != null) {
                return ResponseEntity.ok(bmr);
            } else {
                return ResponseEntity.badRequest().build();
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }


}
