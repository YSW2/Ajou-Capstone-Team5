package com.example.eta.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

public class PortfolioDto {

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateRequestDto {
        private String name;
        private String country;
        private List<String> sector;
        private float asset;
        private int riskValue;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BuyRequestDto {
        private String ticker;
        private boolean isBuy;
        private int quantity;
        private float price;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateRequestToFastApiDto {
        private List<String> tickers;
        private float safe_asset_ratio;
        private int initial_cash;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreatedResultFromFastApiDto {
        private List<Integer> int_asset_num;
        private int cash_hold;
        private List<Float> total_radio_final;
        private float final_returns;
        private float final_vol;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PortfolioPerformance {
        private Integer quantity;
        private Float averageCost;
        private String ticker;
        private String companyName;
        private String equity;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PerformanceResponseDto {
        private float currentCash;
        private float initialAsset;
        private List<PortfolioPerformance> portfolioPerformances;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class sellRequestDto {
        private String ticker;
        private boolean isSell;
        private int quantity;
        private float price;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PortfolioInfo {
        private int id;
        private String name;
        private String country;
        private boolean isAuto;
        private Integer riskValue;
        private LocalDateTime createdDate;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PortfolioInfoListDto {
        private int count;
        private List<PortfolioInfo> portfolios;
    }
}
