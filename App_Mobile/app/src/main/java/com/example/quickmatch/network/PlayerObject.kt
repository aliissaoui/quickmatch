package com.example.quickmatch.network

import com.squareup.moshi.Json

data class PlayerObject(
        val id : Int,
        val surname : String,
        @Json(name = "first_name") val firstName : String,
        val pseudo : String,
        @Json(name = "mdp") val password : String,
        @Json(name = "mail_address") val mailAddress : String,
        @Json(name = "phone_number") val phoneNumber : String?,
        @Json(name = "scored_goals") val scoredGoals : Int,
        @Json(name = "conceded_goals") val concededGoals : Int,
        @Json(name = "matches_played") val matchesPlayed : Int,
        val victories : Int,
        val avatar : String?,
        val bio : String?)

