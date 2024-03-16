import malik.games.game.controllers.IKnowYouLyinApplication;
import org.springframework.boot.SpringApplication;

import java.io.*;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;

public class StartPage {

    public void editJavaScript(String template, String fileName) throws Exception {
        InetAddress ip = InetAddress.getLocalHost();
        String line;
        List<String> lines = new ArrayList<>();
        //Reads every line and updates the "BYTES-LEFT" and "UPDATEDTIME" lines.
        BufferedReader br = new BufferedReader(new FileReader(template));
        while ((line = br.readLine()) != null) {
            if (line.contains("IPADDRESS")) {
                line = line.replace("IPADDRESS", ip.getHostAddress());
            }
            lines.add(line + "\n");

        }
        //Adds the line to the lines list.
        br.close();
        new File(fileName).delete();
        new File(fileName).createNewFile();

        for (String s : lines) {
            FileWriter writer = new FileWriter( fileName, true );
            //Writes the string to the file.
            writer.write( s );
            writer.flush();
            writer.close();
        }
    }

    public static void main(String[] args) throws Exception {
        StartPage startPage = new StartPage();
        startPage.editJavaScript("src/main/resources/templates/scriptTemplate.js","src/main/resources/static/script.js");
        SpringApplication.run(IKnowYouLyinApplication.class, args);
    }
}
