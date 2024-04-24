package com.miru.WebFitnessApplication.calculator;

import com.miru.WebFitnessApplication.user.User;
import org.springframework.stereotype.Service;

@Service
public class CalculatorService {

    //procentul de bmi
    public Double calculateBMI(User user) {
        Double bmi = user.getWeight() / ((user.getHeight() / 100) * (user.getHeight() / 100));

        return Double.parseDouble(String.format("%.2f", bmi));
    }

    //calcul calorii in functie de nivelul de activitate si goal ul utilizatorului
    public Integer calculateBMR(User user) {
        if (user == null) {
            throw new IllegalArgumentException("User cannot be null");
        }
        double b;
        if ("F".equals(user.getGender())) {
            b = 447.593 + ((9.247 * user.getWeight()) + (3.098 * user.getHeight()) - (4.330 * user.getAge()));
        } else if ("M".equals(user.getGender())) {
            b = 88.362 + ((13.387 * user.getWeight()) + (4.799 * user.getHeight()) - (5.677 * user.getAge()));
        } else {
            throw new IllegalArgumentException("Invalid gender");
        }

        double bmr = b;
        switch (user.getActivity()) {
            case 1: // Sedentar
                bmr *= 1.1;
                break;
            case 2: // Ușor activ
                bmr *= 1.2;
                break;
            case 3: // Activ
                bmr *= 1.3;
                break;
            case 4: //Foarte cctiv
                bmr *= 1.4;
                break;
            default:
                throw new IllegalArgumentException("Invalid activity level");
        }

        switch (user.getGoal()) {
            case 1: // Menținere
                break;
            case 2: // Creștere în masă musculară
                bmr *= 1.1;
                break;
            case 3: // Pierdere in greutate
                bmr *= 0.9;
                break;
            default:
                throw new IllegalArgumentException("Invalid goal");
        }

        return (int) Math.round(bmr);
    }

    //macronutrienti
    public int[] calculateMacronutrients(User user) {
        Integer tdee = calculateBMR(user);
        if (tdee == null) {
            return null;
        }

        double proteinPercentage;
        double carbPercentage;
        double fatPercentage;

        switch (user.getGoal()) {
            case 1: // mentinere
                proteinPercentage = 0.2;
                carbPercentage = 0.5;
                fatPercentage = 1 - proteinPercentage - carbPercentage;
                break;
            case 2: // crestere masa musculara
                proteinPercentage = 0.3;
                carbPercentage = 0.4;
                fatPercentage = 1 - proteinPercentage - carbPercentage;
                break;
            case 3: // pierdere in greutate
                proteinPercentage = 0.25;
                carbPercentage = 0.45;
                fatPercentage = 1 - proteinPercentage - carbPercentage;
                break;
            default:
                throw new IllegalArgumentException("Invalid user selection");
        }

        int proteinIntake = (int) Math.round(tdee * proteinPercentage / 4);
        int carbIntake = (int) Math.round(tdee * carbPercentage / 4);
        int fatIntake = (int) Math.round(tdee * fatPercentage / 9);

        return new int[]{proteinIntake, carbIntake, fatIntake};
    }

}
