<?php

/**
 * Created by Reliese Model.
 * Date: Sat, 02 Jun 2018 17:36:40 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Interviewee
 * 
 * @property string $first_name
 * @property string $middle_name
 * @property string $last_name
 * @property int $id
 * @property string $email
 * @property int $interview_id
 * 
 * @property \App\Models\Interview $interview
 * @property \Illuminate\Database\Eloquent\Collection $documents
 * @property \Illuminate\Database\Eloquent\Collection $edu_degrees
 * @property \Illuminate\Database\Eloquent\Collection $marks
 *
 * @package App\Models
 */
class Interviewee extends Eloquent
{
	protected $table = 'interviewee';
	public $timestamps = false;

	protected $casts = [
		'interview_id' => 'int'
	];

	protected $fillable = [
		'first_name',
		'middle_name',
		'last_name',
		'email',
		'interview_id'
	];

	public function interview()
	{
		return $this->belongsTo(\App\Models\Interview::class);
	}

	public function documents()
	{
		return $this->hasMany(\App\Models\Document::class);
	}

	public function edu_degrees()
	{
		return $this->hasMany(\App\Models\EduDegree::class);
	}

	public function marks()
	{
		return $this->hasMany(\App\Models\Mark::class);
	}
}
