package malik.games.game.controllers;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController()
@SpringBootApplication
public class IKnowYouLyinApplication {

    List<String> entries = new ArrayList<>();
    String display = "This Hoe EMPTY";


    @RequestMapping(value = "/input", method = RequestMethod.GET)
    public void addToEntries(@RequestParam(value = "entry") String entry){
        entries.add(entry);
    }

    @GetMapping(value = "/change")
    public void getEntry(){
        if (!entries.isEmpty()) {
            Collections.shuffle(entries);
            display = entries.get(0);
            entries.remove(0);
        }
        else {
            display = "This Hoe EMPTY, stop being boring y'all 🥸";
        }
    }

    @GetMapping(value = "/display")
    public String getDisplay(){
        return display;
    }
    public static void main(String[] args) {
        SpringApplication.run(IKnowYouLyinApplication.class, args);
    }

}
