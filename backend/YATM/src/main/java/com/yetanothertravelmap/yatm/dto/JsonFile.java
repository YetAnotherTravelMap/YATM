package com.yetanothertravelmap.yatm.dto;

import com.yetanothertravelmap.yatm.model.Pin;

import java.util.Set;

public record JsonFile (Set<Pin> pins) {
}
