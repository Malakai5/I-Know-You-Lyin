package malik.games.you_lyin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController()
@SpringBootApplication
public class IKnowYouLyinApplication {

    List<String> entries = new ArrayList<>();


    @RequestMapping(value = "/input", method = RequestMethod.GET)
    public void addToEntries(@RequestParam(value = "entry") String entry){
        entries.add(entry);
    }

    @GetMapping(value = "/submissions")
    public List<String> getSubmissions(){
        return entries;
    }

    @GetMapping(value = "/chosen")
    public void deleteSelected(@RequestParam(value = "selected") String selected){
        System.out.println(selected);
        entries.remove(selected);
    }




    public static void main(String[] args) {
        SpringApplication.run(IKnowYouLyinApplication.class, args);
    }

}
