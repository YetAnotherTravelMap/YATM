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

    public ArrayList<String> getStats(User user){
        user = userRepository.findByUsername(user.getUsername()).orElse(null);

        List<Map> maps = mapRepository.findByUser(user);
        Optional<Set<Pin>> pins;

        Integer totalPins = 0;
        Integer totalCountries = 0;

        ArrayList<String> countryList = new ArrayList<>();
        ArrayList<Integer> countryCount = new ArrayList<>();

        int max = 0;
        int maxIndex = -1;

        for(Map map : maps){
            pins = pinRepository.findByMap_MapId(map.getMapId());
            totalPins += pins.get().size();

            for (Pin pin : pins.get()) {
                if(!countryList.contains(pin.getCountryCode())){
                    countryList.add(pin.getCountryCode());
                    countryCount.add(1);
                    totalCountries++;
                }
                else{
                    int index = countryList.indexOf(pin.getCountryCode());
                    countryCount.set(index, countryCount.get(index) + 1);
                }
            }

            for (int i = 0; i < countryCount.size(); i++) {
                if(countryCount.get(i) > max){
                    maxIndex = i;
                    max = countryCount.get(i);
                }
            }
        }

        ArrayList<String> stats = new ArrayList<>();
        stats.add(totalPins.toString());
        stats.add(totalCountries.toString());
        stats.add(countryList.get(maxIndex));

        return stats;
    }
}
