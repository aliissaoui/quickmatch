package com.example.quickmatch.network

import com.jakewharton.retrofit2.adapter.kotlin.coroutines.CoroutineCallAdapterFactory
import com.squareup.moshi.Moshi
import com.squareup.moshi.kotlin.reflect.KotlinJsonAdapterFactory
import kotlinx.coroutines.Deferred
import retrofit2.Call
import retrofit2.Retrofit
import retrofit2.converter.moshi.MoshiConverterFactory
import retrofit2.create
import retrofit2.http.GET
import retrofit2.http.Path
import retrofit2.http.Query

private const val BASE_URL = "https://dbcontrol.quickmatch.fr/"

// Create Moshi object
private val moshi = Moshi.Builder()
        .add(KotlinJsonAdapterFactory())
        .build()

// Retrofit builder with converter for response and bes url
private val retrofit = Retrofit.Builder()
        .addConverterFactory(MoshiConverterFactory.create(moshi))
        .addCallAdapterFactory(CoroutineCallAdapterFactory())
        .baseUrl(BASE_URL)
        .build()

interface DatabaseApiService {

    @GET("dbcontrol")
    fun testConnection() : Deferred<TestObject>

    @GET("dbcontrol/api/v1/Players")
    fun getAllPlayers() : Deferred<List<PlayerObject>>

    @GET("dbcontrol/api/v1/Players/ma{mail_address}")
    fun getPlayerByMail(@Path("mail_address") mailAddress : String) : Deferred<PlayerObject>

}

object DatabaseApi {

    val retrofitService: DatabaseApiService by lazy {
        retrofit.create(DatabaseApiService::class.java)
    }
}