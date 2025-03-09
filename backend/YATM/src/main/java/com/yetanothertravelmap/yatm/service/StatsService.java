package com.yetanothertravelmap.yatm.service;

import com.yetanothertravelmap.yatm.model.Map;
import com.yetanothertravelmap.yatm.model.PieChartCountryEntry;
import com.yetanothertravelmap.yatm.model.Pin;
import com.yetanothertravelmap.yatm.model.User;
import com.yetanothertravelmap.yatm.repository.MapRepository;
import com.yetanothertravelmap.yatm.repository.PinRepository;
import com.yetanothertravelmap.yatm.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.util.*;
import java.util.List;

@Service
public class StatsService {
    private Random random = new Random();
    private final PinRepository pinRepository;
    private final MapRepository mapRepository;
    private final UserRepository userRepository;

    public StatsService(PinRepository pinRepository, MapRepository mapRepository, UserRepository userRepository){
        this.pinRepository = pinRepository;
        this.mapRepository = mapRepository;
        this.userRepository = userRepository;
    }

    public ArrayList<Object> getStats(User user){
        user = userRepository.findByUsername(user.getUsername()).orElse(null);

        List<Map> maps = mapRepository.findByUser(user);
        Optional<Set<Pin>> pins;

        Integer totalPins = 0;
        Integer totalCountries = 0;

        ArrayList<String> countryList = new ArrayList<>();

        ArrayList<PieChartCountryEntry> countryEntries = new ArrayList<>();


        for(Map map : maps){
            pins = pinRepository.findByMap_MapId(map.getMapId());
            totalPins += pins.get().size();

            for (Pin pin : pins.get()) {
                if(!countryList.contains(pin.getCountryCode())){
                    countryList.add(pin.getCountryCode());
                    countryEntries.add(new PieChartCountryEntry(pin.getCountryCode(), 1, getColour(), pin.getCountry()));
                    totalCountries++;
                }
                else{
                    int index = countryList.indexOf(pin.getCountryCode());
                    countryEntries.get(index).addOne();
                }
            }
        }

        int otherSum = 0;

        ArrayList<PieChartCountryEntry> newCountryEntries = new ArrayList<>();
        String otherCountryString = "";

        countryEntries.sort((e1, e2) -> Integer.compare(e2.getValue(), e1.getValue()));

        for (int i = 0; i < countryEntries.size(); i++) {
            if((double) countryEntries.get(i).getValue() / totalPins < (.05)){
                otherSum += countryEntries.get(i).getValue();

                if(countryEntries.get(i).getCountryName().equals("CÃ´te dâ€™Ivoire")){ //Special case for Côte d'Ivoire because of character issues in database
                    countryEntries.get(i).setCountryName("Côte d'Ivoire");
                }

                otherCountryString += countryEntries.get(i).getCountryName() + " " + (double) Math.round((100*(((double) countryEntries.get(i).getValue())/totalPins)) * 1000d) / 1000d + "%\n";
            }
            else{
                newCountryEntries.add(countryEntries.get(i));
            }
        }

        if(otherSum > 0){
            newCountryEntries.add(new PieChartCountryEntry("other", otherSum, getColour(), otherCountryString));
        }


        ArrayList<Object> stats = new ArrayList<>();
        stats.add(totalPins.toString());
        stats.add(totalCountries.toString());
        stats.add(newCountryEntries);
        stats.add(otherCountryString);

        return stats;
    }

    public String getColour(){
        String colour = "#";
        int[] rgb = {random.nextInt(0,255),random.nextInt(0,255),random.nextInt(0,255)};
        for (int i = 0; i < 3; i++) {
            if(rgb[i] < 16){
                colour = colour + "0";
            }
            colour = colour + Integer.toHexString(rgb[i]);
        }
        return colour;
    }
}
