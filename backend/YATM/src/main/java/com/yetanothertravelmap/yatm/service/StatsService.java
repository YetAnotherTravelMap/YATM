package com.yetanothertravelmap.yatm.service;

import com.yetanothertravelmap.yatm.model.Map;
import com.yetanothertravelmap.yatm.model.Pin;
import com.yetanothertravelmap.yatm.model.User;
import com.yetanothertravelmap.yatm.repository.MapRepository;
import com.yetanothertravelmap.yatm.repository.PinRepository;
import com.yetanothertravelmap.yatm.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class StatsService {
    private final PinRepository pinRepository;
    private final MapRepository mapRepository;
    private final UserRepository userRepository;

    public StatsService(PinRepository pinRepository, MapRepository mapRepository, UserRepository userRepository){
        this.pinRepository = pinRepository;
        this.mapRepository = mapRepository;
        this.userRepository = userRepository;
    }

    public ArrayList<Integer> getStats(User user){
        System.out.println("username: " + user.getUsername());
        user = userRepository.findByUsername(user.getUsername()).orElse(null);

        List<Map> maps = mapRepository.findByUser(user);
        Optional<Set<Pin>> pins;

        Integer totalPins = 0;
        Integer totalCountries = 0;
        Integer totalCities = 0;

        ArrayList<String> countryList = new ArrayList<>();
        ArrayList<String> cityList = new ArrayList<>();

        for(Map map : maps){
            pins = pinRepository.findByMap_MapId(map.getMapId());
            totalPins += pins.get().size();

            for (Pin pin : pins.get()) {
                if(!countryList.contains(pin.getCountry())){
                    countryList.add(pin.getCountry());
                    totalCountries++;
                }
                if(!cityList.contains(pin.getCity())){
                    cityList.add(pin.getCity());
                    totalCities++;
                }
            }
        }

        ArrayList<Integer> stats = new ArrayList<>();
        stats.add(totalPins);
        stats.add(totalCountries);
        stats.add(totalCities);

        return stats;
    }
}
