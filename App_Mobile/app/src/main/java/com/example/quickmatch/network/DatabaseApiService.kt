package com.example.quickmatch.network

import com.squareup.moshi.Moshi
import com.squareup.moshi.kotlin.reflect.KotlinJsonAdapterFactory
import kotlinx.coroutines.Deferred
import retrofit2.Retrofit
import retrofit2.converter.moshi.MoshiConverterFactory
import retrofit2.http.*

/* HTTP requests*/
/* TODO: changer les requêtes en HTTPS (afin de fit avec la version web */

/* URL of the private database where data is retrieved */
private const val BASE_URL = "https://dbcontrol.quickmatch.fr/"

/* Create Moshi object which will parse the responses */
private val moshi = Moshi.Builder()
        .add(KotlinJsonAdapterFactory())
        .build()

/* Retrofit builder with converter for response and base url */
private val retrofit = Retrofit.Builder()
        .addConverterFactory(MoshiConverterFactory.create(moshi))
        .baseUrl(BASE_URL)
        .build()

/* TODO: trouver comment faire pour POST ie. passer un club par exemple dans les params d'une requete */

/* API to communicate with the backend */
interface DatabaseApiService {
    @GET("dbcontrol")
    suspend fun testConnection() : TestObject

    /* PLAYERS */
    /* GET REQUESTS */
    @GET("dbcontrol/api/v1/PlayersRows")
    suspend fun getAllPlayers() : List<PlayerObject>
    @GET("dbcontrol/api/v1/Players/ma{mail_address}")
    suspend fun getPlayerByMail(@Path("mail_address") mailAddress : String) : PlayerObject
    @GET("dbcontrol/api/v1/Players/p{pseudo}")
    suspend fun getPlayerByPseudo(@Path("pseudo") pseudo : String) : PlayerObject
    @GET("dbcontrol/api/v1/Players/id{id}")
    suspend fun getPlayerById(@Path("id") id : Int) : PlayerObject
    @GET("dbcontrol/api/v1/Players/stat{id}")
    suspend fun getPlayerMeetSheetsById(@Path("id") id : Int) : List<MeetsSheetObject>
    //TODO add getByPhoneNumber method when route is available

    /* POST REQUESTS */
    @POST("dbcontrol/api/v1/Players")
    suspend fun addPlayer(@Body player: PlayerObject) : PlayerObject

    /* PUT REQUESTS */
    @PUT("dbcontrol/api/v1/Players/id{id}")
    /* TODO: mettre tous les paramètres d'un player pour l'update 1) soit on met tout à la main 2) metre un objet player */
    suspend fun updatePlayerById(@Path("id") id : Int, @Body player: PlayerObject)

    /* DELETE REQUESTS */
    @DELETE("dbcontrol/api/v1/Players/{mail_address}")
    suspend fun deletePlayerByMail(@Path("mail_address") mailAddress : String)

    /* CLUBS */
    /* GET REQUESTS */
    @GET("dbcontrol/api/v1/ClubsRows")
    suspend fun getAllClubs() : List<ClubObject>
    @GET("dbcontrol/api/v1/Clubs/{id}")
    suspend fun getClubById(@Path("id") id : Int) : ClubObject

    /* DELETE REQUESTS */
    @DELETE("dbcontrol/api/v1/Clubs/{id}")
    suspend fun deleteClubById(@Path("id") id : Int)

    /* POST REQUESTS */
    @POST("dbcontrol/api/v1/Clubs")
    suspend fun addClub(clubObject: ClubObject)

    /* INVITATIONS */
    /* GET REQUESTS */
    @GET("dbcontrol/api/v1/InvitationsRows")
    suspend fun getAllInvitations() : List<InvitationObject>
    @GET("dbcontrol/api/v1/Invitations/{id}")
    suspend fun getInvitationById(@Path("id") id : Int) : InvitationObject

    /* POST REQUESTS */
    @POST("dbcontrol/api/v1/Invitations")
    suspend fun addInvitation(invitationObject: InvitationObject)

    /* DELETE REQUESTS */
    @DELETE("dbcontrol/api/v1/Invitations/{id}")
    suspend fun deleteInvitationById(@Path("id") id : Int)

    /* SLOTS */
    /* GET REQUESTS */
    @GET("dbcontrol/api/v1/SlotsRows")
    suspend fun getAllSlots() : List<SlotObject>
    @GET("dbcontrol/api/v1/Slots/{id}")
    suspend fun getSlotById(@Path("id") id : Int) : SlotObject

    /* POST REQUESTS */
    @POST("dbcontrol/api/v1/Slots")
    suspend fun addSlot(slotObject : SlotObject)

    /* DELETE REQUESTS */
    @DELETE("dbcontrol/api/v1/Slots/{id}")
    suspend fun deleteSlotById(@Path("id") id : Int)

    /* TODO: faire pour les tables : meetsheet, meet, player belong club*/

    /* MEET */
    /* GET REQUESTS */
    @GET("dbcontrol/api/v1/MeetsRows")
    suspend fun getAllMeets() : List<MeetObject>
    @GET("dbcontrol/api/v1/Meets/{id}")
    suspend fun getMeetById(@Path("id") id : Int) : MeetObject

    /* POST REQUESTS */
    @POST("dbcontrol/api/v1/Meets")
    suspend fun addMeet(meetObject : MeetObject)

    /* DELETE REQUESTS */
    @DELETE("dbcontrol/api/v1/Meets/{id}")
    suspend fun deleteMeetById(@Path("id") id : Int)

    /* MEETSHEETS */
    /* GET REQUESTS */
    /* TODO: verifier les types pour les lists de meetsheets */
    @GET("dbcontrol/api/v1/MeetsSheetRows")
    suspend fun getAllMeetsSheets() : List<List<MeetsSheetObject>>
    /* TODO: verifier le back pour cette route (ne marche pas atm) */
    @GET("dbcontrol/api/v1/MeetsSheet/{mail}")
    suspend fun getMeetsSheetByMail(@Path("id") mail : String) : List<MeetsSheetObject>

    /* POST REQUESTS */
    @POST("dbcontrol/api/v1/MeetsSheet")
    suspend fun addMeetsSheet(meetsSheetObject: MeetsSheetObject)

    /* DELETE REQUESTS */
    @DELETE("dbcontrol/api/v1/MeetsSheet/{mail}")
    suspend fun deleteMeetsSheetByMail(@Path("mail") mail : String)

    /* PLAYERBELONGCLUB */
    /* GET REQUESTS */
    @GET("dbcontrol/api/v1/PlayerClubsRows")
    suspend fun getPlayerClubs() : List<PlayerClubsObject>
    /* TODO : rajouter les rows pour chacune des fonctions suivantes (demander à faiz) */
    @GET("dbcontrol/api/v1/PlayerClubs/paid{id}")
    suspend fun getClubsByIdAdmin(@Path("id") id : Int) : List<PlayerClubsObject>
    @GET("dbcontrol/api/v1/PlayerClubs/pid{id}")
    suspend fun getClubsByIdPlayer(@Path("id") id : Int) : List<PlayerClubsObject>


}

object DatabaseApi {

    val retrofitService: DatabaseApiService by lazy {
        retrofit.create(DatabaseApiService::class.java)
    }
}