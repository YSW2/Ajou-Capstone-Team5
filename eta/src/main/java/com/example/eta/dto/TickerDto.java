package com.example.eta.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

public class TickerDto {

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TickerInfo {
        private String ticker;
        private String name;
        private String exchange;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TickerInfoListDto {
        private List<TickerInfo> searchedList;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TickerPrice {
        private String ticker;
        private float current_price;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TickerPriceListDto {
        private List<TickerPrice> prices;
    }

}
